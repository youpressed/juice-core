import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  session: service(),

  startSignup() {
    const lockOptions = {
      autoclose: true,
      allowLogin: true,
      languageDictionary: {
        emailInputPlaceholder: "prepmaster@gmail.com",
        title: "Log in"
      },
      theme: {
        // logo: 'images/logo.gif',
        primaryColor: '#FF5F00'
      },
       auth: {
         redirect: false,
         params: {
           scope: 'openid profile email'
         }
       }
    };

    get(this, 'session').authenticate('authenticator:auth0-lock', lockOptions);
  },

  actions: {
    async didTransition() {
      this.startSignup();
    },

    signup () {
      this.startSignup();
    }
  }
});
