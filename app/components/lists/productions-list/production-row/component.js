import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['layout-row', 'production-row'],

  click() {
    this.get('navigateToProduction')(this.get('model.id'));
  },

  actions: {
    handleDestroyClicked() {
      this.get('destroyNode')(this.get('model'));
    }
  }
});
