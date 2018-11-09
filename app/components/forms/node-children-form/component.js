import Component from '@ember/component';
import { unitTypes } from 'juice-core/constants/unit-conversions';

export default Component.extend({
  uoms: unitTypes,
  showCreateIngredient: false,
  localOnly: false,
  searchPlaceholder: 'Search and add recipes or ingredients...',

  startCreateIngredient(newName) {
    this.set('tempIngredientName', newName);
    this.set('showCreateIngredient', true);
  },

  actions: {
    cancelCreateIngredient() {
      this.set('showCreateIngredient', false);
    },

    createIngredient() {
      this.get('createAndAddNode')('ingredient', this.get('newIngredientName'), this.get('newIngredientUom'));
      this.set('showCreateIngredient', false);
    },

    handleSelect(option) {
      switch (option.action) {
        case "add":
          this.get('addNode')(option.data);
          break;
        case "clone":
          this.get('cloneGrandCentralNode')(option.data.fbId);
          break;
        case "create":
          this.startCreateIngredient(option.label);
          break;
      }
    }
  }
});
