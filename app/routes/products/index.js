import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
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
      const products = this.controllerFor('products.index').get('model');

      const sortedProducts = products.sortBy('position');

      const firstProduct = sortedProducts[0];

      let nextPosition = -1;

      if(firstProduct !== undefined) {
        if(firstProduct.get('position') !== undefined) {
          nextPosition = firstProduct.get('position') - 1;
        }
      }

      const node = this.store.createRecord("node", {
        type:"product",
        label:"untitled",
        position: nextPosition,
        yield: 1,
        uom: "count"
      });

      await node.save();

      this.transitionTo('products.show', node.get('id'));
    }
  }
});
