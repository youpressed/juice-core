import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort, notEmpty } from '@ember/object/computed';

export default Component.extend({
  hasContent: notEmpty('model'),

  sortRules: computed('sortBy', function(){
    return this.get('sortBy') ? [this.get('sortBy')] : ['label'];
  }),

  sortedContent: sort('model', 'sortRules')
});
