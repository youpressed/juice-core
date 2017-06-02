import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('node', params.ingredient_id);
  },

  actions: {
    async addUom(node, label) {
      const newSet = new Set(node.get('forceUomsParsed'));
      newSet.add(label);

      const newArr =
        Array
        .from(newSet)
        .filter(uom => uom !== "");

      node.set('forceUoms', newArr.join(','))
      node.save();
    },

    async removeUom(node, label) {
      const newArr = node.get('forceUomsParsed')
        .filter(uom => uom !== label);

      node.set('forceUoms', newArr.join(','))
      node.save();
    }
  }
});
