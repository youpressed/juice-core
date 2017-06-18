import Ember from 'ember';
const {
  computed: {
    filterBy
  }
} = Ember;

export default Ember.Controller.extend({
  productions: filterBy('nodes', 'isProduction', true)
});
