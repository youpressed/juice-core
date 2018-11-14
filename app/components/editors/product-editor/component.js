import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  validNodes: computed('nodes.@each.{type}', function() {
    return this.get('nodes')
      .filter(n => !n.get('isProduct') && !n.get('isProduction'))
      .filter(n => n !== this.get('model'));
  })
});
