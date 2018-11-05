import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  firebaseSessionService: service(),
  userDataMigrationService: service(),

  async sessionInvalidated() {
    await this.get('firebaseSessionService').signOutFB();
    await this.transitionTo('login');
  },

  async beforeModel() {
    await this.get("userDataMigrationService").checkMigration();
  }
});
