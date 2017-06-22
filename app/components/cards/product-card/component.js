import Ember from 'ember';

const {
  computed: {
    notEmpty
  }
} = Ember;

export default Ember.Component.extend({
  // classNames: ['col'],
  hasNote: notEmpty('product.note')
});
