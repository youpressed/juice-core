import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  session: service(),

  init() {
    this._super(...arguments);
  },

  actions: {
    navigateTo(path) {
      this.transitionToRoute(path);
    },

    login () {
      const lockOptions = {
        autoclose: true,
         auth: {
           params: {
             scope: 'openid profile email'
           }
         }
      };

      get(this, 'session').authenticate('authenticator:auth0-lock', lockOptions);
    }
  }
});
