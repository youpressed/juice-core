import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  validNodes: computed('model.@each.{type}', function() {
    return this.get('nodes')
      .filter(n => !n.get('isProduct') && !n.get('isProduction'))
      .filter(n => n !== this.get('model'));
  })
});
