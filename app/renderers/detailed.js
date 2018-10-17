import NodeRender from 'juice-core/renderers/partials/node';

import {
  positionSort,
  labelSort
} from 'juice-core/utils/sorting';

const buildPayload = async function (production) {
  const date = moment(production.get('date')).format('ddd MM/DD/YY');

  const ingredientsData = await NodeRender(production, 'ingredient');
  const ingredients = {
    renderer: 'detailed/items',
    title: 'Materials',
    collection: [
      {
        label: 'Items',
        collection: ingredientsData
      }
    ]
  };

  const recipesData = await NodeRender(production, 'recipe');
  const recipes = {
    renderer: 'detailed/recipes',
    title: 'Recipes',
    collection: recipesData
  };

  const productionData = await NodeRender(production, 'product', positionSort);
  const productionDetails = {
    renderer: 'detailed/productionDetails',
    title: 'Production Details',
    date,
    collection: productionData
  };

  return {
    data: [
      ingredients,
      recipes,
      productionDetails
    ]
  };
}

export default {
  buildPayload
};
