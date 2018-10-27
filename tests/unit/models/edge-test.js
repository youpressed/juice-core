import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | edge', function (hooks) {
  setupTest(hooks);

  test('has correct parent and child', async function (assert) {

    let recipe = await this.owner.lookup('service:store').createRecord('node', {
      label: "Salty Sauce",
      type: 'recipe'
    });

    let ingredient = await this.owner.lookup('service:store').createRecord('node', {
      label: "Salt",
      type: 'ingredient'
    });

    let recipeIngredient = await this.owner.lookup('service:store').createRecord('edge', {
      a: recipe,
      b: ingredient,
      q:10
    });

    assert.equal(recipeIngredient.get('parentType'), 'recipe');
    assert.equal(recipeIngredient.get('childType'), 'ingredient');
  });
});
