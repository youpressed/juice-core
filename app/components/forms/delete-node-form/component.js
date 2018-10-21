import Component from '@ember/component';

export default Component.extend({
  actions: {
    showDestroyNode() {
      this.set('showDestroyModal', true);
    },

    cancelDestroyNode() {
      this.set('showDestroyModal', false);
    }
  }
});
