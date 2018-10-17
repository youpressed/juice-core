import Service from '@ember/service';
import { notEmpty } from '@ember/object/computed';

export default Service.extend({

  quote: '',
  author: '',
  hasQuote: notEmpty('quote'),

  async refreshQuote() {
    const response = await Ember.$.ajax({
      url: 'http://quotes.rest/qod.json?category=management',
      type:"GET"
     });

     this.set('quote', response.contents.quotes[0].quote);
     this.set('author', response.contents.quotes[0].author);
  }
});
