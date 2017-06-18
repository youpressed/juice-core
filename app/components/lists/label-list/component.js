import Ember from 'ember';

const {
  computed,
  computed: {
    notEmpty,
    sort
  }
} = Ember;

export default Ember.Component.extend({
  hasContent: notEmpty('model'),

  sortRules: computed('sortBy', function(){
    return this.get('sortBy') ? [this.get('sortBy')] : ['label'];
  }),

  sortedContent: sort('model', 'sortRules')
});
