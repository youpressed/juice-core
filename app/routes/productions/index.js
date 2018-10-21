import { Promise } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  setupController(controller) {
    controller.set('nodes', this.store.peekAll('node'));
  },

  model() {
    return Promise.all([
      this.store.findAll('node'),
      this.store.findAll('edge')
    ]);
  }
});
