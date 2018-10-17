import Ember from 'ember';
import config from 'juice-core/config/environment';

export default Ember.Service.extend({
  async generatePdf(payload) {
    return Ember.$.ajax({
      url: config.docService.allDocsEndpoint,
      type:"POST",
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(payload)
     });
  }
});
