import Ember from 'ember';
import DS from 'ember-data';
import _ from 'lodash';
import { toBest, uom } from 'juice-core/utils/converters';

const {
  attr,
  hasMany
} = DS;

const {
  computed,
  computed: {
    equal,
    notEmpty
  }
} = Ember;

const buildAndNormalize = leaf => {
  const data = {
    type: leaf.get('type'),
    label: leaf.get('label'),
    q: 1,
    uom: leaf.get('uom'),
    forceUomsParsed: leaf.get('forceUomsParsed'),
    tree: leaf.get('children').map(edge => edge.get('normalizedTree'))
  };

  return normalizeLeaf(data, leaf.get('normalizedYield'));
}

const normalizeLeaf = (leaf, q) => {
  const converted = toBest(leaf.q * q, leaf.uom, leaf.forceUomsParsed)[0];

  return {
    type: leaf.type,
    label: leaf.label,
    q: converted.q,
    uom: converted.uom,
    forceUomsParsed: leaf.forceUomsParsed,
    tree: leaf.tree.map(tree => normalizeLeaf(tree, q))
  }
}

export default DS.Model.extend({
  label:        attr('string'),
  description:  attr('string'),
  note:         attr('string'),
  uom:          attr('string'),
  yield:        attr('number', {defaultValue: 1}),
  shelfLife:    attr('number', {defaultValue: 3}),
  shelfLifeUom: attr('string', {defaultValue: 'day(s)'}),
  type:         attr('string', {defaultValue: 'ingredient'}),
  date:         attr('date'),
  ts:           attr('number', {defaultValue: () => moment.utc().valueOf()}),
  forceUoms:    attr('string', {defaultValue: ""}),

  children:     hasMany('edge'),
  parents:      hasMany('edge'),

  hasChildren:  notEmpty("children"),

  isIngredient: equal('type', 'ingredient'),
  isRecipe:     equal('type', 'recipe'),
  isProduct:    equal('type', 'product'),
  isProduction: equal('type', 'production'),

  forceUomsParsed: computed("forceUoms", function() {
    const str = this.get('forceUoms');

    if(str) {
      return str.split(',');
    } else {
      return undefined;
    }
  }),

  totalChildQuantity: computed("children.@each.{q}", function() {
    return this.get('children').reduce((acc, cur) => acc + parseFloat(cur.get('q')), 0);
  }),

  normalizedYield: computed("yield", function() {
    return 1/this.get("yield");
  }),

  normalizedChildren: computed("children.@each.{normalizedChildren,q}", "children.@each.{normalizedTree,q}", "forceUomsParsed", "normalizedYield", function() {
    const normalizedYield = this.get("normalizedYield");
    const forceUomsParsed = this.get('forceUomsParsed');

    const selfData = {
      [this.get("id")]: {
        node: this,
        label: this.get('label'),
        type: this.get('type'),
        uom: this.get('uom'),
        forceUomsParsed,
        factor: 1,
        tree: buildAndNormalize(this)
      }
    };

    const mul = obj => {
      return {
        node: obj.node,
        label: obj.node.get('label'),
        type: obj.type,
        uom: obj.uom,
        forceUomsParsed: obj.forceUomsParsed,
        factor: obj.factor * normalizedYield,
        tree: normalizeLeaf(obj.tree, normalizedYield)
      }
    };

    const sumTree = (a, b) => {
      const aNormalized = uom(a.q, a.uom).toBase();
      const bNormalized = uom(b.q, b.uom).toBase();
      const summedQ = aNormalized.q + bNormalized.q;
      const summedUom = aNormalized.uom;
      const summedBest = toBest(summedQ, summedUom, a.forceUomsParsed)[0];

      return {
        type: a.type,
        label: a.label,
        q: summedBest.q,
        uom: summedBest.uom,
        forceUomsParsed: a.forceUomsParsed,
        tree: R.zip(a.tree, b.tree).map(zipped => sumTree(zipped[0], zipped[1]))
      }
    };

    const sum = (a, b) => {

      return {
        node: a.node,
        label: a.label,
        type: a.type,
        uom: a.uom,
        forceUomsParsed: a.forceUomsParsed,
        factor: a.factor + b.factor,
        tree: sumTree(a.tree, b.tree)
      };
    };

    const childDatoms = this.get("children")
      .map(edge => edge.get("normalizedChildren"))
      .reduce((acc, cur) => R.mergeWith(sum, acc, cur), {});

    const factored = R.map(mul, childDatoms);

    return R.mergeWith(() => {}, selfData, factored);
  }),

  normalizedTree: computed("children.@each.{normalizedTree,q}", "forceUomsParsed", "normalizedYield", function() {
    return buildAndNormalize(this);
  }),

  childNodes: computed("children.@each.{childNodes}", function() {
    const edges = this.get("children");
    const nodes = edges.map(edge => edge.get("childNodes"));
    return _.flattenDeep([this, nodes]);
  }),

  childEdges: computed("children.@each.{childEdges}", function() {
    const edges = this.get("children").toArray();
    const downstreamEdges = edges.map(edge => edge.get("childEdges"));
    return _.flattenDeep([edges, downstreamEdges]);
  })
});
