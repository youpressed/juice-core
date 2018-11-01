import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { task } from 'ember-concurrency';

const options = {
  keys: ['label'],
  threshold: 0.1,
};

const client = window.algoliasearch('G9G4H982VD', 'a1d260eff2a0be134462d031d611b146');

export default Component.extend({
  searchTerm: '',
  indexName: 'ingredients',

  fuseService: computed('frontloadData.[]', function(){
    return new window.Fuse(this.get('frontloadData'), options);
  }),

  remoteIndexService: computed('indexName', function(){
    return client.initIndex(this.get('indexName'));
  }),

  results: computed('searchTerm', function(){
    let searchTerm = this.get('searchTerm');
    if (isEmpty(searchTerm)) {
      return [];
    }

    let fuse_results = this.get('fuseService').search(searchTerm);
    if (!isEmpty(fuse_results)) {
      return fuse_results;
    }

    return this.get('searchOnRemoteEndpoint').perform(searchTerm);
  }),

  searchOnRemoteEndpoint: task(function* (searchTerm) {
    return (yield this.get('remoteIndexService').search(searchTerm)).hits;
  })
});
