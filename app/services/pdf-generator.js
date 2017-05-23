import Ember from 'ember';
import config from 'juice-core/config/environment';

export default Ember.Service.extend({
  generateFullPrepSheet(production) {
    return Ember.$.ajax({
      url: config.docService.allDocsEndpoint,
      type:"POST",
      headers: {
        'Content-Type': 'application/json'
      }
     });

  }
});
