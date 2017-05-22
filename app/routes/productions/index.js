import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('node', {
      orderBy: "type",
      equalTo: "production",
      limitToFirst: 10
    })
  },

  actions: {
    async createProduction() {
      const node = this.store.createRecord("node", {
        type:"production"
      });

      node.save();

      this.transitionTo('productions.show', node.get('id'));
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
