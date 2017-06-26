import Ember from 'ember';
import _ from 'lodash';

const {
  computed,
  computed: {
    filterBy,
    notEmpty
  }
} = Ember;

export default Ember.Component.extend({
  classNameBindings: ['hasParents::hide'],

  hasParents:   notEmpty('model.parents'),
  recipes:      filterBy('model.parents', 'parentType', 'recipe'),
  products:     filterBy('model.parents', 'parentType', 'product')
});
