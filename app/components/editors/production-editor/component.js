import Ember from 'ember';

const {
  computed: {
    filterBy
  }
} = Ember;

export default Ember.Component.extend({
  products: filterBy('nodes', 'isProduct', true),

  yoSon: filterBy('model.normalizedChildren', 'type', 'product')
});
