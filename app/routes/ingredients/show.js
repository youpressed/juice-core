import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('model', model[0]);
  },

  model(params) {
    return Ember.RSVP.Promise.all([
      this.store.findRecord("node", params.ingredient_id),
      this.store.query('node', {
        orderBy: "type",
        equalTo: "recipe"
      }),
      this.store.query('node', {
        orderBy: "type",
        equalTo: "product"
      })
    ]);
  },

  actions: {
    
  }
});
