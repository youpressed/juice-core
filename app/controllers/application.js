import Ember from 'ember';

const {
  Controller,
  inject: {
    service
  },
  get
} = Ember;

export default Controller.extend({
  session: service(),

  actions: {
    async didTransition() {
      await this.checkMigration();
    },

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
    },

    logout () {
      get(this, 'session').invalidate();
    }
  }
});
