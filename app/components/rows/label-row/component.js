import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    this.get('clickAction')(this.get('model'));
  }
});
