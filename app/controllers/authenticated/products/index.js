import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    showNode(node) {
      this.transitionToRoute('authenticated.products.show', node.get('id'));
    },

    async createNode() {
      const products = this.get("model");
      const sortedProducts = products.sortBy('position');

      const firstProduct = sortedProducts[0];

      let nextPosition = -1;

      if(firstProduct !== undefined) {
        if(firstProduct.get('position') !== undefined) {
          nextPosition = firstProduct.get('position') - 1;
        }
      }

      const node = this.get("store").createRecord("node", {
        type:"product",
        label:"untitled",
        position: nextPosition,
        yield: 1,
        uom: "count"
      });

      await node.save();

      this.transitionToRoute('authenticated.products.show', node.get('id'));
    }
  }
});
