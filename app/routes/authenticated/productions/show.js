import { all } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, results) {
    controller.set("model", results[0]);
    controller.set("nodes", this.store.peekAll('node'));
  },

  model(params) {
    return all([
      this.store.findRecord('node', params.production_id),
      this.store.findAll('node'),
      this.store.findAll('edge')
    ]);
  }
});
