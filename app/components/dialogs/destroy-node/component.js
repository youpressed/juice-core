import Component from '@ember/component';

export default Component.extend({
  actions: {
    handleSubmit() {
      this.get('submit')();
      this.get('cancel')();
    }
  }
});
