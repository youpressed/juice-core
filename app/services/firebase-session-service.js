import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { resolve } from 'rsvp';

export default Service.extend({
  userService: service(),
  session: service(),
  settingsService: service(),
  firebaseApp: service(),

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
});
