import Ember from 'ember';

const {
  computed,
  computed: {
    notEmpty,
    sort
  }
} = Ember;


export default Ember.Component.extend({
  didReceiveAttrs() {
    const sorted = this.get('model').sortBy('position');
    this.set('sortedModel', sorted);
  },

  actions: {
    sortEndAction() {
      this.get('sortedModel')
        .forEach((item, index) => {
          item.set('position', index);
          item.save();
        })
    }
  }
});
