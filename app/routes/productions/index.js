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
    navigateToProduction(productionId) {
      this.transitionTo('productions.show', productionId);
    },

    async createProduction() {
      const products = this.store.peekAll('node')
        .filter(node => node.get('isProduct'));

      const node = this.store.createRecord("node", {
        type:"production",
        uom:"count"
      });

      node.save();

      await Ember.RSVP.all(products
        .map(b => {
          const edge = this.store.createRecord('edge', {a:node, b, q: 0});
          return edge.save().then(() => Ember.RSVP.all([node.save(), b.save()]))
        }));

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
