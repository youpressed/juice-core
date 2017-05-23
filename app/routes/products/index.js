import Ember from 'ember';
import _ from 'lodash';

export default Ember.Route.extend({
  model() {
    return this.store.query('node', {
      orderBy: "type",
      equalTo: "product"
    })
  },

  actions: {
    async createProduct() {
      const node = this.store.createRecord("node", {
        type:"product",
        label:"untitled",
        yield: 1
      });

      await node.save();

      this.transitionTo('products.show', node.get('id'));
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
    }
  }
});
