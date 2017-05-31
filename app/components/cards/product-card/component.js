import Ember from 'ember';

const {
  computed: {
    notEmpty
  }
} = Ember;

export default Ember.Component.extend({
  classNames: ['flex-100', 'flex-gt-sm-50', 'flex-gt-lg-33'],
  hasNote: notEmpty('model.node.note')
});
