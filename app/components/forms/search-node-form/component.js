import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  search_term: '',
  found_rows: computed('search_term', function(){
    console.log(this.get('search_term'));
    return [new Date().toISOString()];
  })
});
