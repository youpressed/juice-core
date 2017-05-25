import Ember from 'ember';
import { unitTypes } from 'juice-core/constants/unit-conversions';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  sample: 1,
  uoms: unitTypes,
  hellos: ['a', 'b', 'c'],

  validNodes: computed('model.@each.{type}', function() {
    const self = this.get('model');
    return this.get('nodes')
      .filter(n => !n.get('isProduct') && !n.get('isProduction'))
      .filter(n => n !== self);
  }),

  actions: {
    search(q, data) {
      const reg = new RegExp(q, "i");
      const matches = data.options.filter(n => reg.test(n.get('label')));

      if(Ember.isEmpty(matches)) {
        return [
          {
            label:`${q} not found, create it...`,
            stashedName: q,
            action:'createIngredient'
          }
        ]
      } else {
        return matches;
      }
    },

    cancelCreateIngredient() {
      this.set('showCreateIngredient', false);
    },

    createIngredient(data) {
      console.log(data);
      this.set('showCreateIngredient', false);
    },

    handleSelect(option) {
      if(option.action === "createIngredient") {
        // this.get('createAndAddNode')('ingredient', option.stashedName);

        this.set('showCreateIngredient', true);

      } else {
        this.get('addNode')(option);
      }
    }
  }
});
