import { computed } from '@ember/object';
import { notEmpty, equal } from '@ember/object/computed';
import DS from 'ember-data';
import _ from 'lodash';
import R from 'ramda';
import { toBest, uom } from 'juice-core/utils/converters';
import moment from 'moment';

const {
  attr,
  hasMany
} = DS;

const buildAndNormalize = node => {
  const children = node.get('children').map(edge => edge.get('normalizedTree'));

  return {
    type: node.get('type'),
    label: node.get('label'),
    shelfLife: node.get('shelfLife'),
    tags: node.get('tags'),
    q: 1,
    uom: node.get('uom'),
    forceUomsParsed: node.get('forceUomsParsed'),
    tree: children.map(tree => normalizeLeaf(tree, node.get("normalizedYield")))
  };
}

const normalizeLeaf = (obj, q) => {
  const converted = toBest(obj.q * q, obj.uom, obj.forceUomsParsed)[0];

  const newData = {
    q: converted.q,
    uom: converted.uom,
    forceUomsParsed: obj.forceUomsParsed,
    tree: obj.tree.map(tree => normalizeLeaf(tree, q))
  };

  return Object.assign({}, obj, newData);
}

export default DS.Model.extend({
  label:        attr('string'),
  description:  attr('string'),
  position:     attr('number', {defaultValue: 0}),
  note:         attr('string'),
  tags:         attr('string'),
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

  isActive:     attr('boolean', true),

  nodeName: computed("type", function() {
    if(this.get("isIngredient")) {
      return "Ingredient";
    } else if(this.get("isRecipe")) {
      return "Prep Item";
    } else if(this.get("isProduct")) {
      return "Product";
    } else {
      return "Production";
    }
  }),

  forceUomsParsed: computed("forceUoms", function() {
    const str = this.get('forceUoms');

    if(str) {
      return str.split(',');
    } else {
      return undefined;
    }
  }),

  totalChildQuantity: computed("children.@each.{q}", function() {
    return this.get('children').reduce((acc, cur) => acc + (parseFloat(cur.get('q')) || 0), 0);
  }),

  normalizedYield: computed("yield", function() {
    return 1/this.get("yield");
  }),

  normalizedChildren: computed("children.@each.{normalizedChildren,normalizedTree,q}", "forceUomsParsed", "normalizedYield", "position", "tags", "label", "description", "uom", function() {
    const normalizedYield = this.get("normalizedYield");
    const forceUomsParsed = this.get('forceUomsParsed');

    const selfData = {
      [this.get("id")]: {
        // node: this,
        label: this.get('label'),
        description: this.get('description'),
        shelfLife: this.get('shelfLife'),
        tags: this.get('tags'),
        position: this.get('position'),
        type: this.get('type'),
        uom: this.get('uom'),
        forceUomsParsed,
        factor: 1,
        tree: buildAndNormalize(this)
      }
    };

    const mul = obj => {
      const newData = {
        forceUomsParsed: obj.forceUomsParsed,
        factor: obj.factor * normalizedYield,
        tree: normalizeLeaf(obj.tree, normalizedYield)
      }

      return Object.assign({}, obj, newData);
    };

    const sumTree = (a, b) => {
      const aNormalized = uom(a.q, a.uom).toBase();
      const bNormalized = uom(b.q, b.uom).toBase();
      const summedQ = aNormalized.q + bNormalized.q;
      const summedUom = aNormalized.uom;
      const summedBest = toBest(summedQ, summedUom, a.forceUomsParsed)[0];

      const newData = {
        q: summedBest.q,
        uom: summedBest.uom,
        forceUomsParsed: a.forceUomsParsed,
        tree: R.zip(a.tree, b.tree).map(zipped => sumTree(zipped[0], zipped[1]))
      }

      return Object.assign({}, a, newData);
    };

    const sum = (a, b) => {
      const newData = {
        factor: a.factor + b.factor,
        tree: sumTree(a.tree, b.tree)
      }

      return Object.assign({}, a, newData);
    };

    const childDatoms = this.get("children")
      .map(edge => edge.get("normalizedChildren"))
      .reduce((acc, cur) => R.mergeWith(sum, acc, cur), {});

    const factored = R.map(mul, childDatoms);

    return R.mergeWith(() => {}, selfData, factored);
  }),

  normalizedTree: computed("children.@each.{normalizedTree,q,notes}", "forceUomsParsed", "normalizedYield", function() {
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
