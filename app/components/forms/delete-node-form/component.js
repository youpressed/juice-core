import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    showDestroyNode() {
      this.set('showDestroyModal', true);
    },

    cancelDestroyNode() {
      this.set('showDestroyModal', false);
    }
  }
});
