import Ember from 'ember';

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
      const edges = await node.get("children");
      edges.forEach(async edge => {
        const b = await edge.get("b");
        edge.destroyRecord();
        b.save();
      });

      node.destroyRecord();
    }
  }
});
