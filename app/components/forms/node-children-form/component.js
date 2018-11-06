import { isEmpty } from '@ember/utils';
import Component from '@ember/component';
import { unitTypes } from 'juice-core/constants/unit-conversions';
import { task } from 'ember-concurrency';
import config from 'juice-core/config/environment';
import _ from 'lodash';
import { notEmpty } from '@ember/object/computed';

const client = window.algoliasearch(config.algolia.appId, config.algolia.searchApiId);
const index = client.initIndex('nodes');

export default Component.extend({
  uoms: unitTypes,
  showCreateIngredient: true,
  hasChildren: notEmpty("model.children"),

  startCreateIngredient(newName) {
    this.set('tempIngredientName', newName);
    this.set('showCreateIngredient', true);
  },

  searchTask: task(function* (term, data) {
    const reg = new RegExp(term, "i");
    let matches = data.options.filter(n => reg.test(n.get('label')));
    matches = _.take(matches, 5);

    if (!isEmpty(matches)) {
      return matches;
    }

    matches = (yield index.search(term)).hits;
    if (!isEmpty(matches)) {
      return _.each(matches, i => i.fromRemote = true);
    }

    return [
      {
        label: `${term} not found, create it...`,
        stashedName: term,
        action: 'createIngredient'
      }
    ]
  }),

  actions: {
    cancelCreateIngredient() {
      this.set('showCreateIngredient', false);
    },

    createIngredient() {
      this.get('createAndAddNode')('ingredient', this.get('newIngredientName'), this.get('newIngredientUom'));
      this.set('showCreateIngredient', false);
    },

    handleSelect(option) {
      if(option.action === "createIngredient") {
        return this.startCreateIngredient(option.stashedName);
      }

      if(option.fromRemote) {
        return this.get('cloneGrandCentralNode')(option.fbId);
      }

      this.get('addNode')(option);
    }
  }
});
