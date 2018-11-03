import { Promise } from 'rsvp';
import AuthenticatedRoute from 'juice-core/routes/authenticated-route';

export default AuthenticatedRoute.extend({
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
