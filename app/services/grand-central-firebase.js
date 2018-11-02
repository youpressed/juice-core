import $ from 'jquery';
import Service from '@ember/service';
import config from 'juice-core/config/environment';

export default Service.extend({
  buildUrl(nodeName, id){
    return `${config.grandCentralFirebase.url}/${nodeName}/${id}.json`
  },
  async fetch(nodeName, id) {
    return await $.get(this.buildUrl(nodeName, id));
  }
});
