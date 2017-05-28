import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, results) {
    controller.set("model", results[0]);
    controller.set("nodes", this.store.peekAll('node'));
  },

  model(params) {
    return Ember.RSVP.all([
      this.store.findRecord('node', params.production_id),
      this.store.findAll('node'),
      this.store.findAll('edge')
    ]);
  }

});
