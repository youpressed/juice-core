import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  firebaseApp: service(),
  userService: service(),

  async signInFB() {
    const auth0Data = this.get('session.session.authenticated.profile.user_metadata');

    this.get('firebaseApp');

    if(auth0Data) {
      await this.get('firebaseApp').auth()
        .signInWithCustomToken(auth0Data.fbtoken)
        .catch(error => console.log(error.code, error.message));

      this.get('userService').manage(auth0Data);
    } else {
      return Ember.RSVP.resolve();
    }
  },

  signOutFB() {
    this.get('firebaseApp').auth().signOut();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this.signInFB()
      .then(() => this.transitionTo('productions'))
  },

  sessionInvalidated() {
    this.signOutFB();
    this._super(...arguments);
  },

  beforeModel() {
    this._super(...arguments);
    return this.signInFB();
  },

  actions: {
    navigateTo(path) {
      this.transitionTo(path);
    }
  }
});
