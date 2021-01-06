import Component from '@ember/component';

export default Component.extend({
  // click() {
  //   this.get('clickAction')(this.get('model'));
  // },
  actions: {
    showDetail() {
      this.get('clickAction')(this.get('model'));
    },

    toggleExcludeInPrinting() {
      let model = this.get('model');
      this.get('handleUpdate')(model, 'excludeInPrinting', model.toggleProperty('excludeInPrinting'));
    }
  }
});
