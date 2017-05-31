import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.query('node', {
      orderBy: "type",
      equalTo: "recipe"
    })
  },

  actions: {
    async createRecipe() {
      const node = this.store.createRecord("node", {
        type:"recipe",
        label:"untitled",
        uom: 'floz',
        yield: 1
      });

      await node.save();

      this.transitionTo('recipes.show', node.get('id'));
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
