import Component from '@ember/component';

export default Component.extend({
  isIngredient: true,

  didInsertElement() {
    this._super(...arguments);
    let typeOptions = [
      { label: 'We buy it ready made', value: true },
      { label: 'We make it here', value: false }
    ];
    this.set('typeOptions', typeOptions);
  },

  actions: {
    handleSubmit() {
      const payload = {
        type: this.get('isIngredient') ? 'ingredient' : 'recipe',
        label: this.get('label'),
        uom: 'lb'
      };

      this.get('create')(payload);
    }
  }
});
