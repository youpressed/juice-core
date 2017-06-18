import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.query('node', {
      orderBy: "type",
      equalTo: "ingredient"
    });
  },

  actions: {
    showNode(node) {
      this.transitionTo('ingredients.show', node.get('id'));
    },

    async createNode() {
      const node = this.store.createRecord("node", {
        type:"ingredient",
        label:"untitled",
        yield: 1,
        uom: "lb"
      });

      await node.save();

      this.transitionTo('ingredients.show', node.get('id'));
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
