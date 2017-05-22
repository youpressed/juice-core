import Ember from 'ember';
import DS from 'ember-data';
import _ from 'lodash';

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

export default DS.Model.extend({
  label:        attr('string'),
  uom:          attr('string'),
  yield:        attr('number', {defaultValue: 1}),
  type:         attr('string', {defaultValue:"ingredient"}),

  children:     hasMany('edge'),
  parents:      hasMany('edge'),

  hasChildren:  notEmpty("children"),

  isIngredient: equal('type', 'ingredient'),
  isRecipe:     equal('type', 'recipe'),
  isProduct:    equal('type', 'product'),
  isProduction: equal('type', 'production'),

  normalizedYield: computed("yield", "hasChildren", function() {
    return this.get("hasChildren") ? 1 / this.get("yield") : 1;
  }),

  normalizedChildren: computed("children.@each.{normalizedChildren,q}", "normalizedYield", function() {
    const selfData = {
      [this.get("id")]: {
        node: this,
        factor: 1
      }
    };

    const normalizedYield = this.get("normalizedYield");
    const mul = obj => ({
        node: obj.node,
        factor: obj.factor * normalizedYield
    });

    const sum = (a, b) => ({
      node: a.node,
      factor: a.factor + b.factor
    });

    const childDatoms = this.get("children")
      .map(edge => edge.get("normalizedChildren"))
      .reduce((acc, cur) => R.mergeWith(sum, acc, cur), {});

    const factored = R.map(mul, childDatoms);

    return R.mergeWith(() => {}, selfData, factored);
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
