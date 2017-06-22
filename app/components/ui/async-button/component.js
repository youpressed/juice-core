import Ember from 'ember';

export default Ember.Component.extend({
  // loading:true,

  async clickHandler() {
    this.set('loading', true);
    await this.get('onClick')();
    this.set('loading', false);
  },

  click() {
    this.clickHandler();
  }
});
