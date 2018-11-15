import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  grandCentralFirebase: service(),
  nodeService: service(),

  actions: {
    async handleUpdate(model, key, val) {
      await this.get('nodeService').handleUpdate(model, key, val);
    },

    async deleteEdge(edge) {
      await this.get('nodeService').deleteEdge(edge);
    },

    async addNode(a, b) {
      await this.get('nodeService').addEdge(a, b);
    },

    async cloneGrandCentralNode(currentNode, childId) {
      await this.get('grandCentralFirebase').addChildNode(currentNode, childId);
    },

    async createAndAddNode(a, data) {
      await this.get('nodeService').createAndAddNode(a, data);
    },

    async destroyNode(node) {
      await this.get("nodeService").destroyNode(node);
      this.transitionToRoute('authenticated.products');
    }
  }
});
