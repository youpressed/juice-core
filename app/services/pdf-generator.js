import Ember from 'ember';
import config from 'juice-core/config/environment';
import _ from 'lodash';


import { toBest } from 'juice-core/utils/converters';
import { toMixed } from 'juice-core/utils/converters';
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

export default Ember.Service.extend({

  async generateFullPrepSheet(production) {
    const data = await production.get('normalizedChildren');
    const edges = await production.get('children');

    const ingredients = _
      .filter(data, node => node.type === 'ingredient')
      .filter(ing => ing.factor > 0)
      .map(ing => {
        const converted =
          toMixed(ing.factor, ing.uom, ing.forceUomsParsed)
          .map(obj => ({
            q: roundTo(obj.q, 0),
            uom: obj.uom
          }));
        return {
          label: ing.label,
          converted
        }
      })
      .sort(sortFunc);

    const recipes = _
      .filter(data, node => node.type === 'recipe')
      .filter(recipe => recipe.factor > 0)
      .map(recipe => {
        const converted =
          toMixed(recipe.factor, recipe.uom, recipe.forceUomsParsed)
          .map(obj => ({
            q: roundTo(obj.q, 0),
            uom: obj.uom
          }));
        return {
          label: recipe.label,
          converted
        }
      })
      .sort(sortFunc);

    const products =
      await Ember.RSVP.all(edges
        .map(async edge => {
          const node = await edge.get('b');
          const children = await node.get('children');

          const scaledChildren = await Ember.RSVP.all(children
            .map(async childEdge => {
              const childNode = await childEdge.get('b');
              const qtyInBase = (childEdge.get('normalizedQuantity') * edge.get('normalizedQuantity'));

              const converted =
                toMixed(qtyInBase, childEdge.get('uom'), childNode.get('forceUomsParsed'))
                .map(obj => ({
                  q: roundTo(obj.q, 0),
                  uom: obj.uom
                }));

              return {
                label: childNode.get('label'),
                converted
              }
            }));

          await scaledChildren;
          const sortedChildren = scaledChildren.sort(sortFunc);

          return {
            label: node.get('label'),
            q: edge.get('q'),
            note: node.get('note') || '',
            children: sortedChildren
          }
        }));

    await products;
    const sortedProducts = products
      .filter(product => product.q > 0)
      .sort(sortFunc);

    const payload = {
      date: moment(production.get('date')).format('ddd MM/DD/YY'),
      ingredients,
      recipes,
      products: sortedProducts
    };

    return Ember.$.ajax({
      url: config.docService.allDocsEndpoint,
      type:"POST",
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(payload)
     });
  }
});
