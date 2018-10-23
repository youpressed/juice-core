import { resolve } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';
import localforage from 'localforage';

export default Route.extend(ApplicationRouteMixin, {
  firebaseApp: service(),
  userService: service(),
  settingsService: service(),

  async flushLS () {
    await localforage.setItem("appdata", {version:2});

    this.get('session').invalidate();
  },

  // Use this if there are breaking changes to the data model. This will wipe the session object from LS
  // and force a hard refresh to avoid weird migration issues with simple auth
  async checkMigration() {
    let appData = await localforage.getItem("appdata");

    if(appData === null) {
      await this.flushLS();
    }

    appData = await localforage.getItem("appdata");

    if(appData.version != 2) {
      await this.flushLS();
    }
  },

  async signInFB() {

    const auth0Data = this.get('session.data.authenticated.profile');

    this.get('firebaseApp');

    if(auth0Data) {
      await this.get('firebaseApp').auth()
        .signInWithCustomToken(auth0Data['https://app.youpressed.com/fbToken'])
        .catch(() => this.get('session').invalidate());

      this.get('userService').manage(auth0Data);

      this.get('settingsService').boot();
    } else {
      return resolve();
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
    this.transitionTo('login');
  },

  beforeModel() {
    this._super(...arguments);
    return this.signInFB();
  },

  actions: {
    async didTransition() {
      await this.checkMigration();
    }
  }
});
