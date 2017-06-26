import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings:['loading:disabled'],
  
  async clickHandler() {
    this.set('loading', true);
    await this.get('onClick')();
    this.set('loading', false);
  },

  click() {
    if(!this.get('loading')) {
      this.clickHandler();
    }
  }
});
