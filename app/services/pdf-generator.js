import $ from 'jquery';
import Service from '@ember/service';
import config from 'juice-core/config/environment';

export default Service.extend({
  async generatePdf(payload) {
    return $.ajax({
      url: config.docService.allDocsEndpoint,
      type:"POST",
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(payload)
     });
  }
});
