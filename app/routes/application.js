import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    navigateTo(path) {
      this.transitionTo(path);
    }
  }
});
