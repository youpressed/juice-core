import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

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
    // return fuse.search(this.get('search_term'));


    const search = instantsearch({
      appId: 'G9G4H982VD',
      apiKey: 'a1d260eff2a0be134462d031d611b146',
      indexName: 'ingredients'
    });

    // initialize SearchBox
    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Search for products'
      })
    );

    // initialize hits widget
    search.addWidget(
      instantsearch.widgets.hits({
        container: '#hits'
      })
    );

    search.start();

    return [];
  })
});
