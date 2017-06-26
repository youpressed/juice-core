import Ember from 'ember';
import _ from 'lodash';

const {
  computed,
  computed: {
    filterBy,
    sort
  }
} = Ember;

export default Ember.Controller.extend({
  sortByTimestamp: ['ts:desc'],
  sortedProductions: sort('productions', 'sortByTimestamp'),

  productions: filterBy('nodes', 'isProduction', true),

  recentProductions: computed('sortedProductions', function() {
    return _.take(this.get('sortedProductions'), 10);
  })
});
