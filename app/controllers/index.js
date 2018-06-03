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
    signup () {
      const lockOptions = {
      allowLogin: false,
      languageDictionary: {
        emailInputPlaceholder: "prepmaster@gmail.com",
        title: "Sign Up"
      },
      theme: {
        logo: 'images/logo.gif',
        primaryColor: '#2475EA'
      },
       auth: {
         redirect: false,
         params: {
           scope: 'openid profile email'
         }
       }
      };

      get(this, 'session').authenticate('authenticator:auth0-lock', lockOptions);
    }
  }
});
