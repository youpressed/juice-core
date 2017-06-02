import Ember from 'ember';

const {
  computed: {
    filterBy
  }
} = Ember;

export default Ember.Component.extend({
  ingredients: filterBy('model', 'type', 'ingredient')
});
