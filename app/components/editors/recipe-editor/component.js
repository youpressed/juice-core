import Component from '@ember/component';
import { computed } from '@ember/object';
import { unitTypes } from 'juice-core/constants/unit-conversions';

export default Component.extend({
  uoms: unitTypes,

  validNodes: computed('model.@each.{type}', function() {
    return this.get('nodes')
      .filter(n => !n.get('isProduct') && !n.get('isProduction'))
      .filter(n => n !== this.get('model'));
  })
});
