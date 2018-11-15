import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),
  nodeService: service(),

  adjustmentEdges: computed('model.children.@each.{sign}', function(){
    return this.get('model.children').filter(edge => edge.get('sign') === -1);
  }),

  normalEdges: computed('model.children.@each.{sign}', function(){
    return this.get('model.children').filter(edge => edge.get('sign') !== -1);
  }),

  validSubtractableNodes: computed('nodes.@each.{type}', function() {
    return this.get('nodes').filter(n => n.get('isIngredient') || n.get('isRecipe'));
  }),

  actions: {
    async createAdjustmentEdge(b) {
      const a = this.get('model');
      const uom = b.get('uom');
      const edgeData = {a, b, uom, sign:-1};
      const edge = this.get('store').createRecord('edge', edgeData);
      await edge.save();

      await a.save();
      await b.save();
    },

    navigateToProductionSheets(productionId) {
      this.transitionToRoute('authenticated.productions.sheets', productionId);
    },

    async deleteEdge(edge) {
      await this.get('nodeService').deleteEdge(edge);
    },

    async handleUpdate(model, key, val) {
      await this.get('nodeService').handleUpdate(model, key, val);
    },

    updateProductionDate(production, date) {
      production.set('date', date);
      production.save();
    }
  }
});
