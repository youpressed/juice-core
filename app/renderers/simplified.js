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
        shelfLife: tree.shelfLife,
        tags: tree.tags,
        position: tree.position,
        q: tree.q,
        uom: tree.uom,
        collection: tree.tree.sort(sortFunc)
      }
    });
}

const buildPayload = async function (production) {
  const normalizedChildren = await production.get('normalizedChildren');

  const date = moment(production.get('date')).format('ddd MM/DD/YY');

  const ingredients = {
    renderer: 'simplified/items',
    title: 'Step 1 - Gather All Material',
    collection: [
      {
        label: 'Items',
        collection: buildCollection(normalizedChildren, 'ingredient')
      }
    ]
  };

  const recipes = {
    renderer: 'simplified/recipes',
    title: 'Step 2 - Juice All Items',
    collection: buildCollection(normalizedChildren, 'recipe')
  };

  const products = {
    renderer: 'simplified/products',
    title: 'Step 3 - Mix Juices',
    collection: buildCollection(normalizedChildren, 'product', positionSortFunc)
  };

  return {
    data: [
      ingredients,
      recipes,
      products
    ]
  };
}

export default {
  buildPayload
};
