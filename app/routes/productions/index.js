import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import _ from 'lodash';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('nodes', this.store.peekAll('node'));
  },

  model(params) {
    return Ember.RSVP.Promise.all([
      this.store.query('node', {
        orderBy: "type",
        equalTo: "production"
      }),
      this.store.query('node', {
        orderBy: "type",
        equalTo: "product"
      })
    ]);
  },

  actions: {
    showNode(node) {
      this.transitionTo('productions.show', node.get('id'));
    },

    async createNode() {
      const products = this.store.peekAll('node')
        .filter(node => node.get('isProduct'))
        .filter(node => node.get('isActive'));

      const date = moment().toDate();
      const node = this.store.createRecord("node", {
        type:"production",
        uom:"count",
        date
      });

      node.save();

      await Ember.RSVP.all(products
        .map(b => {
          const edge = this.store.createRecord('edge', {a:node, b, q: 0});
          return edge.save().then(() => Ember.RSVP.all([node.save(), b.save()]))
        }));

      this.transitionTo('productions.show', node.get('id'));
    }
  }
});
