import Ember from 'ember';
import { inject as service } from '@ember/service';
import downloadFile from "juice-core/utils/download-file";
import NodeRender from 'juice-core/renderers/partials/node';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  unitCount: 10,

  pdfGenerator: service(),
  store: service(),

  actions: {
    async printRecipe() {
      const node = await this.get('store').createRecord('node');
      const edge = await this.get('store').createRecord('edge', {a:node, b:this.get('product'), q:this.get('unitCount'), uom:this.get('product.uom')});

      const data = await NodeRender(node, 'recipe');

      const payload = {
        data: [
          {
            renderer: 'detailed/recipes',
            title: 'Recipes',
            collection: data
          }
        ]
      };

      // Cleanup the temp models
      this.get('store').unloadRecord(node);
      this.get('store').unloadRecord(edge);

      const { url } = await this.get('pdfGenerator').generatePdf(payload);

      return downloadFile(url, 'mykey');
    }
  }
});
