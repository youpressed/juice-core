import { Promise } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  grandCentralFirebase: service(),

  setupController(controller, model) {
    controller.set('model', model[0]);
    controller.set('nodes', this.store.peekAll('node'));
  },

  model(params) {
    return Promise.all([
      this.store.findRecord("node", params.recipe_id),
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
    navigateTo(path) {
      this.transitionTo(path);
    },

    handleUpdate(model, key, val) {
      model.set(key, val);
      model.save();
    },

    async deleteEdge(edge) {
      const a = await edge.get('a');
      const b = await edge.get('b');
      await edge.destroyRecord();

      a.save();
      b.save();
    },

    async addNode(a, b) {
      const edge = this.store.createRecord('edge', {a, b, q: 0, uom:b.get('uom')});
      await edge.save();

      a.save();
      b.save();
    },

    async cloneGrandCentralNode(currentNode, childId) {
      await this.get('grandCentralFirebase').addChildNode(currentNode, childId);
    },

    async createAndAddNode(a, data) {
      const { type, label, description, uom } = data;
      const b = this.store.createRecord('node', {type, label, description, uom});
      await b.save();

      const edge = this.store.createRecord('edge', {a, b, q: 0, uom});
      await edge.save();

      a.save();
      b.save();
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

      this.transitionTo('recipes');
    }
  }
});
