import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: ['hasChildren::hide'],

  hasNote: notEmpty('data.model.note'),
  hasChildren: notEmpty('data.model.children')
});
