import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  hasDestroyAction: notEmpty('destroyAction'),
  isShowingExtrasMenu: false,

  totalCount: computed('model.children.@each.{q,sign}', function() {
    return this.get('model.children')
      .filter(edge => edge.get('sign') !== -1)
      .reduce((acc, cur) => acc + (parseFloat(cur.get('q')) || 0), 0);
  }),

  click() {
    this.get('clickAction')(this.get('model'));
  },

  actions: {
    handleDestroyClicked() {
      this.get('destroyAction')(this.get('model'));
    },

    toggleExtrasMenu(e) {
      if(e) {
        e.stopPropagation();
      }
      this.toggleProperty('isShowingExtrasMenu');
    }
  }
});
