import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  totalCount: computed('model.children.@each.{q,sign}', function() {
    return this.get('model.children')
      .filter(edge => edge.get('sign') !== -1)
      .reduce((acc, cur) => acc + (parseFloat(cur.get('q')) || 0), 0);
  }),

  click() {
    this.get('clickAction')(this.get('model'));
  },

  actions: {
    showDestroyDialog(e) {
      e.stopPropagation();
      this.set('isDestroyingNode', true);
    },
    handleDestroy() {
      this.get('destroyAction')(this.get('model'));
      this.set('isDestroyingNode', false);
    }
  }
});
