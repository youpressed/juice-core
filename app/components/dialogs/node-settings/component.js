import Component from '@ember/component';

export default Component.extend({
  tagName: "",
  actions: {
    toggleExcludeInPrinting() {
      let model = this.get('model');
      this.get('handleUpdate')(model, 'excludeInPrinting', model.toggleProperty('excludeInPrinting'));
    }
  }
});
