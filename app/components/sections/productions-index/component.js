import Ember from 'ember';

const {
  computed: {
    notEmpty,
    sort
  }
} = Ember;

export default Ember.Component.extend({
  classNames: ['row', 'center'],
  hasProductions: notEmpty('model'),

  sortByTimestamp: ['ts:desc'],
  sortedProductions: sort('model', 'sortByTimestamp')
});
