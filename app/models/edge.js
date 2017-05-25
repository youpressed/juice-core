import DS from 'ember-data';
import Ember from "ember";

const {
  attr,
  belongsTo
} = DS;

const {
  computed,
  computed: {
    alias
  }
} = Ember;

export default DS.Model.extend({
  q:     attr('number', {defaultValue: 0}),
  uom:     attr('string', {defaultValue: 'floz'}),

  a:     belongsTo('node', {inverse: 'children'}),
  b:     belongsTo('node', {inverse: 'parents'}),

  normalizedChildren: computed("b.normalizedChildren", "q", function() {
    const q = this.get("q");
    const mul = obj => ({
      node: obj.node,
      type: obj.type,
      factor: obj.factor * q
    });

    const childDatoms = this.get("b.normalizedChildren") || {};

    return R.map(mul, childDatoms);
  }),

  childNodes: alias("b.childNodes"),
  childEdges: alias("b.childEdges")
});
