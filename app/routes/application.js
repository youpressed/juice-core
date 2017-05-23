import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.RSVP.all([
      this.store.findAll('node'),
      this.store.findAll('edge')
    ]);
  },

  actions: {
    navigateTo(path) {
      this.transitionTo(path);
    }
  }
});
