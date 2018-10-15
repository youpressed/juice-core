import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default Route.extend({
  settingsService: inject(),

  model() {
    return {
      printTemplate: 'detailed'
    }
  }
});
