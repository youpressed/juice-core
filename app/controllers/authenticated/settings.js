import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  settingsService: inject(),

  actions: {
    updatePrintTemplate(template) {
      this.get('settingsService').updatePrintTemplate(template);
    }
  }
});
