import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { notEmpty, bool, sort, filterBy } from '@ember/object/computed';
import _ from 'lodash';
import { inject as service } from '@ember/service';

export default Controller.extend({

  store: service(),
  nodeService: service(),

  sortByTimestamp: Object.freeze(['ts:desc']),
  sortedProductions: sort('productions', 'sortByTimestamp'),

  productions: filterBy('nodes', 'isProduction', true),
  products: filterBy('nodes', 'isProduct', true),

  hasProductions: notEmpty("productions"),
  hasProducts: notEmpty("products"),

  canCreateProduction: bool("hasProducts"),

  recentProductions: computed('sortedProductions', function() {
    return _.take(this.get('sortedProductions'), 10);
  }),

  actions: {
    showNode(node) {
      this.transitionToRoute('authenticated.productions.show', node.get('id'));
    },

    async createNode() {
      let production = await this.get('nodeService').createProduction();
      this.transitionToRoute('authenticated.productions.show', production.get('id'));
    },

    async destroyNode(node) {
      await this.get('nodeService').destroyNode(node);
    },

    async createProduct(){
      let product = await this.get('nodeService').createProduct();
      this.transitionToRoute('authenticated.products.show', product.get('id'));
    }
  }
});
