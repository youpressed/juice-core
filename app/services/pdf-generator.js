import Ember from 'ember';
import config from 'juice-core/config/environment';
import _ from 'lodash';

import { toBest } from 'juice-core/utils/converters';

export default Ember.Service.extend({
  async generateFullPrepSheet(production) {
    const data = await production.get('normalizedChildren');
    const edges = await production.get('children');

    const ingredients = _
      .filter(data, node => node.type === 'ingredient')
      .map(ing => {
        const converted = toBest(ing.factor, ing.uom)
        return {
          label: ing.label,
          q: converted.q,
          uom: converted.uom
        }
      })
      .sort((a, b) => {
        const labelA = a.label.toUpperCase();
        const labelB = b.label.toUpperCase();
        if (labelA < labelB) {
          return -1;
        }
        if (labelA > labelB) {
          return 1;
        }

        return 0;
      });

    const recipes = _
      .filter(data, node => node.type === 'recipe')
      .map(recipe => {
        const converted = toBest(recipe.factor, recipe.uom)
        return {
          label: recipe.label,
          q: converted.q,
          uom: converted.uom
        }
      })
      .sort((a, b) => {
        const labelA = a.label.toUpperCase();
        const labelB = b.label.toUpperCase();
        if (labelA < labelB) {
          return -1;
        }
        if (labelA > labelB) {
          return 1;
        }

        return 0;
      });

    const products =
      await Ember.RSVP.all(edges
        .map(async edge => {
          const node = await edge.get('b');
          const children = await node.get('children');

          const scaledChildren = await Ember.RSVP.all(children
            .map(async childEdge => {
              const childNode = await childEdge.get('b');
              const qtyInBase = (childEdge.get('normalizedQuantity') * edge.get('normalizedQuantity'));
              const converted = toBest(qtyInBase, childEdge.get('uom'));

              return {
                label: childNode.get('label'),
                q: converted.q,
                uom: converted.uom
              }
            }));

          await scaledChildren;
          const sortedChildren = scaledChildren
            .sort((a, b) => {
              const labelA = a.label.toUpperCase();
              const labelB = b.label.toUpperCase();
              if (labelA < labelB) {
                return -1;
              }
              if (labelA > labelB) {
                return 1;
              }

              return 0;
            });

          return {
            label: node.get('label'),
            q: edge.get('q'),
            note: node.get('note') || '',
            children: sortedChildren
          }
        }));

    await products;
    const sortedProducts = products
      .sort((a, b) => {
        const labelA = a.label.toUpperCase();
        const labelB = b.label.toUpperCase();
        if (labelA < labelB) {
          return -1;
        }
        if (labelA > labelB) {
          return 1;
        }

        return 0;
      });

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
