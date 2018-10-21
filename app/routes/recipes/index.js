import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
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
