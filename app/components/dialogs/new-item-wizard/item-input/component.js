import Component from '@ember/component';

export default Component.extend({
  isIngredient: true,

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
