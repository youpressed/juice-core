import { Promise } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('model', model[0]);
    controller.set('nodes', this.store.peekAll('node'));
  },

  model(params) {
    return Promise.all([
      this.store.findRecord("node", params.recipe_id),
      this.store.query('node', {
        orderBy: "type",
        equalTo: "recipe"
      }),
      this.store.query('node', {
        orderBy: "type",
        equalTo: "ingredient"
      })
    ]);
  }
});
