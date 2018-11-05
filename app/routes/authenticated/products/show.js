import { all } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('model', model[0]);
    controller.set('nodes', this.store.peekAll('node'));
  },

  model(params) {
    return all([
      this.store.findRecord("node", params.product_id),
      this.store.findAll('node'),
      this.store.findAll('edge')
    ]);
  }
});
