import AuthenticatedRoute from 'juice-core/routes/authenticated-route';

export default AuthenticatedRoute.extend({
  model() {
    return this.store.query('node', {
      orderBy: "type",
      equalTo: "recipe"
    })
  },

  actions: {
    showNode(node) {
      this.transitionTo('recipes.show', node.get('id'));
    },

    async createNode() {
      const node = this.store.createRecord("node", {
        type:"recipe",
        label:"untitled",
        uom: 'floz',
        yield: 1
      });

      await node.save();

      this.transitionTo('recipes.show', node.get('id'));
    }
  }
});
