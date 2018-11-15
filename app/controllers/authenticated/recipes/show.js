import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  grandCentralFirebase: service(),

  actions: {
    handleUpdate(model, key, val) {
      model.set(key, val);
      model.save();
    },

    async deleteEdge(edge) {
      const a = await edge.get('a');
      const b = await edge.get('b');
      await edge.destroyRecord();

      await a.save();
      await b.save();
    },

    async addNode(a, b) {
      const edge = this.store.createRecord('edge', {a, b, q: 0, uom:b.get('uom')});
      await edge.save();

      await a.save();
      await b.save();
    },

    async cloneGrandCentralNode(currentNode, childId) {
      await this.get('grandCentralFirebase').addChildNode(currentNode, childId);
    },

    async createAndAddNode(a, data) {
      const { type, label, description, uom } = data;
      const b = this.store.createRecord('node', {type, label, description, uom, isActive: true});
      await b.save();

      const edge = this.store.createRecord('edge', {a, b, q: 0, uom});
      await edge.save();

      await a.save();
      await b.save();
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

      this.transitionToRoute('authenticated.recipes');
    }
  }
});
