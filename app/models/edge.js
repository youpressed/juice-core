import DS from 'ember-data';
import Ember from "ember";
import { uom } from 'juice-core/utils/converters';

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
  uom:   attr('string', {defaultValue: 'floz'}),

  a:     belongsTo('node', {inverse: 'children'}),
  b:     belongsTo('node', {inverse: 'parents'}),

  normalizedQuantity: computed("q", "uom", 'b.uom', function() {
    return uom(this.get('q'), this.get('uom')).to(this.get('b.uom'));
  }),

  normalizedChildren: computed("b.normalizedChildren", "normalizedQuantity", function() {
    const mul = obj => {
      
      return {
        label: obj.label,
        node: obj.node,
        type: obj.type,
        uom: obj.uom,
        forceUomsParsed: obj.forceUomsParsed,
        factor: obj.factor * this.get("normalizedQuantity")
      }
    };

    const childDatoms = this.get("b.normalizedChildren") || {};

    return R.map(mul, childDatoms);
  }),

  childNodes: alias("b.childNodes"),
  childEdges: alias("b.childEdges")
});
