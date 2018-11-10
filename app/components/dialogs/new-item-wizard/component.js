import Component from '@ember/component';

export default Component.extend({
  isShowRecipeInstruction: false,

  showRecipeInstruction(){
    this.set('isShowRecipeInstruction', true);
  },

  actions: {
    createItem(node) {
      this.get('create')(node);

      if (node.type == 'recipe') {
        return this.showRecipeInstruction();
      }

      return this.get('cancel')();
    }
  }
});
