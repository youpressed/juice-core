import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    controller.set('nodes', this.store.peekAll('node'));
    this._super(...arguments);
  },

  model(params) {
    return this.store.findRecord("node", params.recipe_id);
  },

  actions: {
    handleUpdate(model, key, val) {
      model.set(key, val);
      model.save();
    },

    async addNode(a, b) {
      const edge = this.store.createRecord('edge', {a, b, q: 0});
      await edge.save();

      a.save();
      b.save();
    },

    async createAndAddNode(a, type, label) {
      const b = this.store.createRecord('node', {type, label});
      await b.save();

      const edge = this.store.createRecord('edge', {a, b, q: 0});
      await edge.save();

      a.save();
      b.save();
    }
  }
});
