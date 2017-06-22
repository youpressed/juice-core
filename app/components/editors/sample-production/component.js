import Ember from 'ember';
import _ from 'lodash';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  unitCount: 10,

  recipes: computed("product.normalizedChildren.@each.{q,uom}", function() {
    return _.filter(this.get('product.normalizedChildren'), edge => edge.type === 'recipe')
  }),

  ingredients: computed("product.normalizedChildren.@each.{q,uom}", function() {
    return _.filter(this.get('product.normalizedChildren'), edge => edge.type === 'ingredient')
  }),

  cards: computed("recipes", "ingredients", "product", "unitCount", function() {
    const recipes = this.get('recipes');
    const ingredients = this.get('ingredients');
    const product = this.get('product');
    const unitCount = this.get('unitCount');
    const factoredCount = product.get('normalizedYield') * unitCount;
    const baseUom = product.get('uom');

    const recipeCards = recipes
      .filter(recipe => recipe.node != product)
      .map(recipe => {
        return {
          type:'cards/recipe-card',
          id: recipe.node.get('id'),
          data: {
            model:recipe.node,
            factor: factoredCount * recipe.factor
          }
        }
      });

    return _.flatten([
      {
        type:`cards/${product.get('type')}-card`,
        id: product.get('id'),
        data:{
          model: product,
          factor: unitCount
        }
      },
      recipeCards,
      {
        type:'cards/ingredients-card',
        id: 'ingredients',
        data: {
          model:ingredients,
          factor: unitCount
        }
      }
    ]);
  })
});
