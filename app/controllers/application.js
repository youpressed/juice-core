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
