import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('model', model[0]);
    controller.set('nodes', this.store.peekAll('node'));
  },

  model(params) {
    return Ember.RSVP.Promise.all([
      this.store.findRecord("node", params.product_id),
      this.store.query('node', {
        orderBy: "type",
        equalTo: "recipe"
      }),
      this.store.query('node', {
        orderBy: "type",
        equalTo: "ingredient"
      })
    ]);
  },

  actions: {
    handleUpdate(model, key, val) {
      model.set(key, val);
      model.save();
    },

    async addNode(a, b) {
      const edge = this.store.createRecord('edge', {a, b, q: 0, uom:b.get('uom')});
      await edge.save();

      a.save();
      b.save();
    },

    async createAndAddNode(a, type, label, uom) {
      const b = this.store.createRecord('node', {type, label, uom});
      await b.save();

      const edge = this.store.createRecord('edge', {a, b, q: 0, uom});
      await edge.save();

      a.save();
      b.save();
    }
  }
});
