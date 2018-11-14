import Component from '@ember/component';

export default Component.extend({
  tagName: "",
  actions: {
    toggleActive() {
      let model = this.get('model');
      this.get('toggleActive')(model, 'isActive', model.toggleProperty('isActive'));
    }
  }
});
