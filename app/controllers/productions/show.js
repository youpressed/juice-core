import Controller from '@ember/controller';
import {computed} from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

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
      const edge = this.get('store').createRecord('edge', {a, b, q: 0, sign:-1});
      await edge.save();

      a.save();
      b.save();
    },

    navigateToProductionSheets(productionId) {
      this.transitionToRoute('productions.sheets', productionId);
    },

    handleUpdate(model, key, val) {
      model.set(key, val);
      model.save();
    },

    updateProductionDate(production, date) {
      production.set('date', date);
      production.save();
    },

    async addProductToProduction(a, b) {
      const edge = this.get('store').createRecord('edge', {a, b, q: 0});
      await edge.save();

      a.save();
      b.save();
    },

    async destroyNode(node) {
      const edges = await node.get("children");
      edges.forEach(async edge => {
        const b = await edge.get("b");
        edge.destroyRecord();
        b.save();
      });

      node.destroyRecord();

      this.transitionToRoute('products');
    }
  }
});
