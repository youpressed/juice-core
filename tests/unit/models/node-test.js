import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | node', function (hooks) {
  setupTest(hooks);

  test('has correct data and calculations', async function (assert) {

    let recipe = await this.owner.lookup('service:store').createRecord('node', {
      label: "Salty Sauce",
      type: 'recipe'
    });

    let ingredient = await this.owner.lookup('service:store').createRecord('node', {
      label: "Salt",
      type: 'ingredient'
    });

    await this.owner.lookup('service:store').createRecord('edge', {
      a: recipe,
      b: ingredient,
      q: 10
    });

    assert.equal(ingredient.get('isIngredient'), true);
    assert.equal(ingredient.get('totalChildQuantity'), 0);

    assert.equal(recipe.get('isRecipe'), true);
    assert.equal(recipe.get('totalChildQuantity'), 10);
  });
});
