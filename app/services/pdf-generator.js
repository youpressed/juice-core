import Ember from 'ember';
import config from 'juice-core/config/environment';

export default Ember.Service.extend({
  generateFullPrepSheet(production) {
    const sample = {
      "pdfData": [
        {
          "label": "kale",
          "weight": 1
        }
      ]
    };

    return Ember.$.ajax({
      url: config.docService.allDocsEndpoint,
      type:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(sample)
     });

  }
});
