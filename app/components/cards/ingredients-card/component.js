import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: ['hasIngredients::hide'],
  hasIngredients: notEmpty('data.model')
});
