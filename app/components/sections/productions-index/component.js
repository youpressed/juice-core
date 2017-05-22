import Ember from 'ember';

const {
  computed: {
    notEmpty
  }
} = Ember;

export default Ember.Component.extend({
  hasProductions: notEmpty('model')
});
