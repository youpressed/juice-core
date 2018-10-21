import Service, { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import RenderTypes from 'juice-core/constants/render-types';

export default Service.extend({
  userService: service(),

  printTemplate: computed('data.printTemplate', function() {
    return this.get('data.printTemplate') || RenderTypes.simplified;
  }),

  boot() {
    this.get('userService.fbRef')
      .child('settings')
      .on('value', snapshot => {
        this.set('data', snapshot.val());
      });
  },

  updatePrintTemplate(template){
    this.get('userService.fbRef')
      .child('settings')
      .update({printTemplate:template});
  }
});
