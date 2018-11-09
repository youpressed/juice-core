import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  isVisible: computed('activeId', function(){
    return this.get('activeId') == this.get('elementId');
  })
});
