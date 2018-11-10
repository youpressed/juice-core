import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  store: inject(),

  actions: {
    showNode(node) {
      this.transitionToRoute('authenticated.recipes.show', node.get('id'));
    },

    async createNode() {
      const node = this.store.createRecord("node", {
        type:"recipe",
        label:"untitled",
        uom: 'floz',
        yield: 1
      });

      await node.save();

      this.transitionToRoute('authenticated.recipes.show', node.get('id'));
    }
  }
});
