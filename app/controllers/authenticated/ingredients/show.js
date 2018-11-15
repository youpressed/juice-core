import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  nodeService: service(),

  actions: {
    async handleUpdate(model, key, val) {
      await this.get('nodeService').handleUpdate(model, key, val);
    },

    async destroyNode(node) {
      await this.get('nodeService').destroyNode(node);
      this.transitionToRoute('authenticated.ingredients');
    }
  }
});
