import Ember from 'ember';
import downloadFile from "juice-core/utils/download-file";

const {
  computed: {
    filterBy
  }
} = Ember;

export default Ember.Component.extend({
  products: filterBy('nodes', 'isProduct', true),
  pdfGenerator: Ember.inject.service(),

  yoSon: filterBy('model.normalizedChildren', 'type', 'product'),

  actions: {
    async printAll() {
      const { url } = await this.get('pdfGenerator').generateFullPrepSheet();
      return downloadFile(url, 'mykey');
    }
  }
});
