import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    handleSubmit() {
      this.get('submit')();
      this.get('cancel')();
    }
  }
});
