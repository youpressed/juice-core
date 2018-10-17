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

const normalizeLeaf = (leaf, q, notes) => {
  const converted = toBest(leaf.q * q, leaf.uom, leaf.forceUomsParsed)[0];

  const newData = {
    q: converted.q,
    notes: notes,
    uom: converted.uom,
    tree: leaf.tree.map(tree => normalizeLeaf(tree, q, tree.notes))
  };

  return Object.assign({}, leaf, newData);
}

export default DS.Model.extend({
  q:           attr('number', {defaultValue: 0}),
  uom:         attr('string', {defaultValue: 'floz'}),
  notes:       attr('string'),

  a:           belongsTo('node', {inverse: 'children'}),
  b:           belongsTo('node', {inverse: 'parents'}),

  parentType:  alias('a.type'),
  childType:   alias('b.type'),

  aPosition:   alias('a.position'),
  bPosition:   alias('b.position'),

  childNodes:  alias("b.childNodes"),
  childEdges:  alias("b.childEdges"),

  normalizedQuantity: computed("q", "uom", 'b.uom', function() {
    return uom(this.get('q'), this.get('uom')).to(this.get('b.uom'));
  }),

  normalizedChildren: computed("b.normalizedChildren", "b.normalizedTree", "normalizedQuantity", function() {
    const mul = obj => {
      const newData = {
        factor: obj.factor * this.get("normalizedQuantity"),
        tree: normalizeLeaf(obj.tree, this.get("normalizedQuantity"))
      }

      return Object.assign({}, obj, newData);
    };

    const childDatoms = this.get("b.normalizedChildren");

    return R.map(mul, childDatoms);
  }),

  normalizedTree: computed("b.normalizedTree", "normalizedQuantity", 'notes', function() {
    return normalizeLeaf(this.get('b.normalizedTree'), this.get("normalizedQuantity"), this.get('notes'));
  })
});
