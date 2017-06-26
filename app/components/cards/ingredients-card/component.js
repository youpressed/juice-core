import Ember from 'ember';

const {
  notEmpty
} = Ember.computed;

export default Ember.Component.extend({
  classNameBindings: ['hasIngredients::hide'],
  hasIngredients: notEmpty('data.model')
});
