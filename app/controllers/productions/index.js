import { all } from 'rsvp';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort, filterBy } from '@ember/object/computed';
import _ from 'lodash';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Controller.extend({

  store: service(),

  sortByTimestamp: Object.freeze(['ts:desc']),
  sortedProductions: sort('productions', 'sortByTimestamp'),

  productions: filterBy('nodes', 'isProduction', true),

  recentProductions: computed('sortedProductions', function() {
    return _.take(this.get('sortedProductions'), 10);
  }),

  actions: {
    showNode(node) {
      this.transitionToRoute('productions.show', node.get('id'));
    },

    async createNode() {
      const products = this.get('store').peekAll('node')
        .filter(node => node.get('isProduct'))
        .filter(node => node.get('isActive'));

      const date = moment().toDate();
      const node = this.get('store').createRecord("node", {
        type:"production",
        uom:"count",
        date
      });

      node.save();

      await all(products
        .map(b => {
          const edge = this.get('store').createRecord('edge', {a:node, b, q: 0});
          return edge.save().then(() => all([node.save(), b.save()]));
        }));

      this.transitionToRoute('productions.show', node.get('id'));
    },

    async destroyNode(node) {
      const children = await node.get("children");
      const parents = await node.get("parents");

      children
        .forEach(async edge => {
          const b = await edge.get("b");
          edge.destroyRecord();
          b.save();
        });

      parents
        .forEach(async edge => {
          const a = await edge.get("a");
          edge.destroyRecord();
          a.save();
        });

      node.destroyRecord();
    }
  }
});
