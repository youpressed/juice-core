import DS from 'ember-data';
import Ember from "ember";
import { uom } from 'juice-core/utils/converters';
import { toBest } from 'juice-core/utils/converters';

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

const normalizeLeaf = (leaf, q) => {
  const converted = toBest(leaf.q * q, leaf.uom, leaf.forceUomsParsed)[0];

  return {
    label: leaf.label,
    shelfLife: leaf.shelfLife,
    tags: leaf.tags,
    notes: leaf.notes,
    type: leaf.type,
    q: converted.q,
    uom: converted.uom,
    forceUomsParsed: leaf.forceUomsParsed,
    tree: leaf.tree.map(tree => normalizeLeaf(tree, q))
  }
}

export default DS.Model.extend({
  q:           attr('number', {defaultValue: 0}),
  uom:         attr('string', {defaultValue: 'floz'}),

  a:           belongsTo('node', {inverse: 'children'}),
  b:           belongsTo('node', {inverse: 'parents'}),

  parentType:  alias('a.type'),
  childType:   alias('b.type'),

  childNodes:  alias("b.childNodes"),
  childEdges:  alias("b.childEdges"),

  normalizedQuantity: computed("q", "uom", 'b.uom', function() {
    return uom(this.get('q'), this.get('uom')).to(this.get('b.uom'));
  }),

  normalizedChildren: computed("b.normalizedChildren", "b.normalizedTree", "normalizedQuantity", function() {
    const mul = obj => {
      return {
        label: obj.label,
        shelfLife: obj.shelfLife,
        tags: obj.tags,
        node: obj.node,
        type: obj.type,
        uom: obj.uom,
        forceUomsParsed: obj.forceUomsParsed,
        factor: obj.factor * this.get("normalizedQuantity"),
        tree: normalizeLeaf(obj.tree, this.get("normalizedQuantity"))
      }
    };

    const childDatoms = this.get("b.normalizedChildren") || {};

    return R.map(mul, childDatoms);
  }),

  normalizedTree: computed("b.normalizedTree", "normalizedQuantity", function() {
    return normalizeLeaf(this.get('b.normalizedTree'), this.get("normalizedQuantity"));
  })
});
