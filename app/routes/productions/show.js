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
  },

  actions: {
    handleUpdate(model, key, val) {
      model.set(key, val);
      model.save();
    },

    async addProductToProduction(a, b) {
      const edge = this.store.createRecord('edge', {a, b, q: 0});
      await edge.save();

      a.save();
      b.save();
    }
  }
});
