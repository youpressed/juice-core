import Ember from 'ember';
import config from 'juice-core/config/environment';
import _ from 'lodash';

import { toBest } from 'juice-core/utils/converters';
import { roundTo } from 'juice-core/utils/math';

const sortFunc = (a, b) => {
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

const buildCollection = (data, type) => {
  return _
    .map(data)
    .filter(child => child.type === type)
    .filter(child => child.factor > 0)
    .map(child => child.tree)
    .map(tree => {
      return {
        label: tree.label,
        q: tree.q,
        uom: tree.uom,
        collection: tree.tree
      }
    });
}

export default Ember.Service.extend({

  async generateFullPrepSheet(production) {
    const normalizedChildren = await production.get('normalizedChildren');

    const date = moment(production.get('date')).format('ddd MM/DD/YY');

    const ingredients = {
      renderer: 'items-v2',
      title: 'Item Sheet',
      collection: [
        {
          label: 'Items',
          collection: buildCollection(normalizedChildren, 'ingredient')
        }
      ]
    };

    const recipes = {
      renderer: 'composites-v2',
      title: 'Recipe Sheet',
      collection: buildCollection(normalizedChildren, 'recipe')
    };

    const products = {
      renderer: 'composites-v2',
      title: 'Product Sheet',
      collection: buildCollection(normalizedChildren, 'product')
    };

    const payload = {
      data: [
        ingredients,
        recipes,
        products
      ]
    };

    // console.log(payload.data[1].collection[0]);

    return Ember.$.ajax({
      url: config.docService.allDocsEndpoint,
      type:"POST",
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(payload)
     });
  }
});
