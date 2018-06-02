import Ember from 'ember';
import config from 'juice-core/config/environment';
import _ from 'lodash';

import { toBest } from 'juice-core/utils/converters';
import { roundTo } from 'juice-core/utils/math';

const labelSortFunc = (a, b) => {
  const labelA = a.label.toUpperCase();
  const labelB = b.label.toUpperCase();
  if (labelA < labelB) {
    return -1;
  }
  if (labelA > labelB) {
    return 1;
  }

  return 0;
}

const positionSortFunc = (a, b) => {
    if (a.position > b.position) {
      return 1;
    } else if (a.position > b.position) {
      return -1;
    }

    return 0;
}

const buildCollection = (data, type, sortFunc = labelSortFunc) => {
  return _
    .map(data)
    .filter(child => child.type === type)
    .filter(child => child.factor > 0)
    .sort(sortFunc)
    .map(child => child.tree)
    .map(tree => {
      return {
        label: tree.label,
        position: tree.position,
        q: tree.q,
        uom: tree.uom,
        collection: tree.tree.sort(sortFunc)
      }
    });
}

export default Ember.Service.extend({

  async generateFullPrepSheet(production) {
    const normalizedChildren = await production.get('normalizedChildren');

    const date = moment(production.get('date')).format('ddd MM/DD/YY');

    const ingredients = {
      renderer: 'items-v2',
      title: 'Step 1 - Gather All Material',
      collection: [
        {
          label: 'Items',
          collection: buildCollection(normalizedChildren, 'ingredient')
        }
      ]
    };

    const recipes = {
      renderer: 'simplified-composite',
      title: 'Step 2 - Juice All Items',
      collection: buildCollection(normalizedChildren, 'recipe')
    };

    const products = {
      renderer: 'composites-v2',
      title: 'Step 3 - Mix Juices',
      collection: buildCollection(normalizedChildren, 'product', positionSortFunc)
    };

    const payload = {
      data: [
        ingredients,
        recipes,
        products
      ]
    };

    return Ember.$.ajax({
      url: config.docService.allDocsEndpoint,
      type:"POST",
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(payload)
     });
  }
});
