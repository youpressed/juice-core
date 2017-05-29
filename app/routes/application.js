import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  model() {
    return Ember.RSVP.all([
      this.store.findAll('node'),
      this.store.findAll('edge')
    ]);
  },

  actions: {
    navigateTo(path) {
      this.transitionTo(path);
    }
  }
});
