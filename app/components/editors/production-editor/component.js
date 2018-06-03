import Ember from 'ember';
import downloadFile from "juice-core/utils/download-file";

const {
  computed,
  computed: {
    filterBy,
    sort,
    alias
  }
} = Ember;


export default Ember.Component.extend({
  classNames: ['row', 'center'],
  products: filterBy('nodes', 'isProduct', true),
  pdfGenerator: Ember.inject.service(),
  metrics: Ember.inject.service(),

  products: alias('model.children'),

  sortedProducts: sort('products', (a, b) => {
    if (a.get('b.position') > b.get('b.position')) {
      return 1;
    } else if (a.get('b.position') > b.get('b.position')) {
      return -1;
    }

    return 0;
  }),

  actions: {
    async printAll() {
      this.get('metrics').trackEvent({eventCategory:'docs', eventAction:'printall'});
      const { url } = await this.get('pdfGenerator').generateFullPrepSheet(this.get('model'));
      return downloadFile(url, 'mykey');
    },

    handleQuantityUpdate(edge, val) {
      if(val !== undefined) {
        this.get('handleUpdate')(edge, "q", val);
      }
    },

    handleQuantityBlur(edge, event) {
      if(event.target.value === "" || event.target.value === undefined) {
        this.get('handleUpdate')(edge, "q", 0);
      }
    }
  }
});
