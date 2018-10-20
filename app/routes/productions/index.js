import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('nodes', this.store.peekAll('node'));
  },

  model(params) {
    return Ember.RSVP.Promise.all([
      this.store.findAll('node'),
      this.store.findAll('edge')
    ]);
  }
});
