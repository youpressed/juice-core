import Ember from 'ember';
import { unitTypes } from 'juice-core/constants/unit-conversions';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  uoms: unitTypes,

  validNodes: computed('model.@each.{type}', function() {
    return this.get('nodes')
      .filter(n => !n.get('isProduct') && !n.get('isProduction'))
      .filter(n => n !== this.get('model'));
  })
});
