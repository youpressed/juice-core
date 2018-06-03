import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const {
  inject: {
    service
  },
  get
} = Ember;

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
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
    didTransition() {
      this.startSignup();
    },

    signup () {
      this.startSignup();
    }
  }
});
