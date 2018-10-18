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
    
  }
});
