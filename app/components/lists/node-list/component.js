import Ember from 'ember';

const {
  computed,
  computed: {
    sort
  }
} = Ember;

export default Ember.Component.extend({
  filteredNodes: computed('model', function(){
    const data = this.get('model');
    return Object.keys(data)
      .map(key => data[key])
      .filter(obj => obj.type === this.get('type'))
  }),

  sortByLabel: ['label'],
  sortedNodes: sort('filteredNodes', 'sortByLabel')
});
