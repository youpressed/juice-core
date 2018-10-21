import NodeRender from 'juice-core/renderers/partials/node';

import {
  positionSort
} from 'juice-core/utils/sorting';

const buildPayload = async function (production) {
  const ingredientsData = await NodeRender(production, 'ingredient');
  const ingredients = {
    renderer: 'simplified/items',
    title: 'Step 1 - Gather All Material',
    collection: [
      {
        label: 'Items',
        collection: ingredientsData
      }
    ]
  };

  const recipesData = await NodeRender(production, 'recipe');
  const recipes = {
    renderer: 'simplified/recipes',
    title: 'Step 2 - Juice All Items',
    collection: recipesData
  };

  const productsData = await NodeRender(production, 'product', positionSort);
  const productsDetails = {
    renderer: 'simplified/products',
    title: 'Step 3 - Mix Juices',
    collection: productsData
  };

  return {
    data: [
      ingredients,
      recipes,
      productsDetails
    ]
  };
}

export default {
  buildPayload
};
