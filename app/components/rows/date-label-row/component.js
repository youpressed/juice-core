import Ember from 'ember';

const {
  computed: {
    notEmpty
  }
} = Ember;

export default Ember.Component.extend({
  hasDestroyAction: notEmpty('destroyAction'),

  click() {
    this.get('clickAction')(this.get('model'));
  },

  actions: {
    handleDestroyClicked() {
      this.get('destroyAction')(this.get('model'));
    }
  }
});
