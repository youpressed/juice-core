import Ember from 'ember';
import config from 'juice-core/config/environment';
import _ from 'lodash';

// import ConvertUnits from "npm:convert-units";

export default Ember.Service.extend({
  generateFullPrepSheet(data) {

    const ingredients = _
      .filter(data, node => node.type === 'ingredient')
      .map(ing => {
        return {
          label: ing.label,
          vol: ing.factor,
          vUom: 'oz',
          raw: 10,
          rUom: 'lb'
        }
      });

    const recipes = _
      .filter(data, node => node.type === 'product')
      .map(recipe => {
        return {
          label: recipe.label,
          count: recipe.factor,
          note: "The bentonite clay needs to be added last and mixed very well, be added last and mixed very well.",
          ingredients: _
            .filter(recipe.node.get('normalizedChildren'), node => node.type === "ingredient")
            .map(ing => {
              return {
                label: ing.label,
                qty: ing.factor * recipe.factor,
                uom: 'fl oz'
              }
            })
        }
      });

    const sample = {
      date:'6/1/17',
      ingredients,
      recipes
    };

    return Ember.$.ajax({
      url: config.docService.allDocsEndpoint,
      type:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(sample)
     });
  }
});
