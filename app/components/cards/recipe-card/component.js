import Ember from 'ember';

const {
  computed: {
    notEmpty
  }
} = Ember;

export default Ember.Component.extend({
  classNameBindings: ['hasChildren::hide'],

  hasNote: notEmpty('data.model.note'),
  hasChildren: notEmpty('data.model.children')
});
