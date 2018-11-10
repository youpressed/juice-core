import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  grandCentralFirebase: service(),
  nodeService: service(),

  actions: {
    navigateTo(path) {
      this.transitionToRoute(path);
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
      const edge = this.get('store').createRecord('edge', {a, b, q: 0, uom:b.get('uom')});
      await edge.save();

      a.save();
      b.save();
    },

    async cloneGrandCentralNode(currentNode, childId) {
      await this.get('grandCentralFirebase').addChildNode(currentNode, childId);
    },

    async createAndAddNode(a, data) {
      const { type, label, description, uom } = data;
      const b = this.get('store').createRecord('node', { type, label, description, uom, isActive: true });
      await b.save();

      const edge = this.get('store').createRecord('edge', { a, b, q: 0, uom });
      await edge.save();

      a.save();
      b.save();
    },

    async destroyNode(node) {
      await this.get("nodeService").destroyNode(node);

      this.transitionToRoute('authenticated.products');
    }
  }
});
