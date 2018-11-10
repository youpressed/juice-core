import Component from '@ember/component';
import downloadFile from "juice-core/utils/download-file";
import { sort } from '@ember/object/computed';
import { inject } from '@ember/service';
import RenderMap from 'juice-core/renderers/render-map';
import { unitTypes } from 'juice-core/constants/unit-conversions';

export default Component.extend({
  uoms: unitTypes,
  pdfGenerator: inject(),
  settingsService: inject(),

  sortedRow: sort('normalEdges.@each.{bPosition}', (a, b) => {
    if (a.get('bPosition') > b.get('bPosition')) {
      return 1;
    } else if (a.get('bPosition') < b.get('bPosition')) {
      return -1;
    }

    return 0;
  }),

  actions: {
    async printAll() {
      const templateType = this.get('settingsService').get('printTemplate');
      const renderer = RenderMap[templateType];

      const payload = await renderer.buildPayload(this.get('model'));

      const { url } = await this.get('pdfGenerator').generatePdf(payload);

      return downloadFile(url, 'mykey');
    },
    handleQuantityUpdate(edge, val) {
      if (val !== undefined) {
        this.get('handleUpdate')(edge, "q", val);
      }
    },

    handleQuantityBlur(edge, event) {
      if (event.target.value === "" || event.target.value === undefined) {
        this.get('handleUpdate')(edge, "q", 0);
      }
    }
  }
});
