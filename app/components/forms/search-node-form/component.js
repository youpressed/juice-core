import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  search_term: '',
  found_rows: computed('search_term', function(){

    var books = [{
      'title': "Old Man's War",
      'author': 'John Scalzi',
      'tags': ['fiction']
    }, {
      'title': 'The Lock Artist',
      'author': 'Steve',
      'tags': ['thriller']
    }];

    var options = {
      keys: ['author', 'tags']
    };
    var fuse = new Fuse(books, options);
    return fuse.search(this.get('search_term'));
  })
});
