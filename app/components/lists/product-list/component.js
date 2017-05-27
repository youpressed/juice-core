import Ember from 'ember';

const {
  computed,
  computed: {
    sort
  }
} = Ember;

export default Ember.Component.extend({
  factoredNodes: computed('model', 'model.@each.{q,uom}', function(){
    return this.get('model')
      .map(edge => ({
        node:edge.get('b'),
        factor: edge.get('normalizedQuantity')
      }));
  }),

  sortByLabel: ['label'],
  sortedNodes: sort('filteredNodes', 'sortByLabel')
});
