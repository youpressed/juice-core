import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import generatePalette from 'ember-paper/utils/generate-palette';

export default Controller.extend({
  session: service(),
  paperTheme: service(),

  init() {
    this._super(...arguments);

    const primary = generatePalette('#355C7D');
    const accent = generatePalette('#99B898');
    const warn = generatePalette('#FC3FBB');

    this.get('paperTheme').installTheme('main', {
      primary,
      accent,
      warn
    });
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
    },

    logout () {
      get(this, 'session').invalidate();
    }
  }
});
