import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  uoms: [
    'tsp',
    'tbs',
    'floz',
    'qt',
    'gal'
  ],

  validNodes: computed('model.@each.{type}', function() {
    return this.get('nodes')
      .filter(n => !n.get('isProduct') && !n.get('isProduction'));
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

    handleSelect(option) {
      if(option.action === "createIngredient") {
        this.get('createAndAddNode')('ingredient', option.stashedName);
      } else {
        this.get('addNode')(option);
      }
    }
  }
});
