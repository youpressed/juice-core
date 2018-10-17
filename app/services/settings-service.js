import Ember from 'ember';
import { computed } from '@ember/object';
import RenderTypes from 'juice-core/constants/render-types';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Service.extend({
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
