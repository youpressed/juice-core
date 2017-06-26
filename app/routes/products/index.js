import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.query('node', {
      orderBy: "type",
      equalTo: "product"
    })
  },

  actions: {
    showNode(node) {
      this.transitionTo('products.show', node.get('id'));
    },

    async createNode() {
      const node = this.store.createRecord("node", {
        type:"product",
        label:"untitled",
        yield: 1,
        uom: "count"
      });

      await node.save();

      this.transitionTo('products.show', node.get('id'));
    }
  }
});
