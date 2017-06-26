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
    }
  }
});
