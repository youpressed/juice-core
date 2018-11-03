import { all } from 'rsvp';
import AuthenticatedRoute from 'juice-core/routes/authenticated-route';

export default AuthenticatedRoute.extend({
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
