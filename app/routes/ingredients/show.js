import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('model', model[0]);
  },

  model(params) {
    return Ember.RSVP.Promise.all([
      this.store.findRecord("node", params.ingredient_id),
      this.store.query('node', {
        orderBy: "type",
        equalTo: "recipe"
      }),
      this.store.query('node', {
        orderBy: "type",
        equalTo: "product"
      })
    ]);
  },

  actions: {
    handleUpdate(model, key, val) {
      model.set(key, val);
      model.save();
    },

    async addUom(node, uoms) {
      node.set('forceUoms', uoms.join(','))
      node.save();
    },

    async removeUom(node, label) {
      const newArr = node.get('forceUomsParsed')
        .filter(uom => uom !== label);

      node.set('forceUoms', newArr.join(','))
      node.save();
    },

    async destroyNode(node) {
      const children = await node.get("children");
      const parents = await node.get("parents");

      children
        .forEach(async edge => {
          const b = await edge.get("b");
          edge.destroyRecord();
          b.save();
        });

      parents
        .forEach(async edge => {
          const a = await edge.get("a");
          edge.destroyRecord();
          a.save();
        });

      node.destroyRecord();

      this.transitionTo('ingredients');
    }
  }
});
