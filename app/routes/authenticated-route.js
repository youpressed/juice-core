import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { isEmpty } from '@ember/utils';
import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';


export default Route.extend(AuthenticatedRouteMixin, {
  firebaseApp: service(),

  async beforeModel() {
    const auth0Data = this.get('session.data.authenticated.profile');
    const currentUser = this.get('firebaseApp').auth().currentUser;

    // if Auth0 authenticated, however, firebase not authenticate yet
    if (!isEmpty(auth0Data) && isEmpty(currentUser)) {
      await getOwner(this).lookup('route:application').signInFB();
    }
    this._super(...arguments);
  }
});
