import { all } from 'rsvp';
import AuthenticatedRoute from 'juice-core/routes/authenticated-route';

export default AuthenticatedRoute.extend({
  setupController(controller, results) {
    controller.set("model", results[0]);
    controller.set("nodes", this.store.peekAll('node'));
  },

  model(params) {
    return all([
      this.store.findRecord('node', params.ingredient_id),
      this.store.findAll('node'),
      this.store.findAll('edge')
    ]);
  }
});
