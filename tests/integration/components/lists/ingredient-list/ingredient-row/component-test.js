import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lists/ingredient-list/ingredient-row', 'Integration | Component | lists/ingredient list/ingredient row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lists/ingredient-list/ingredient-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lists/ingredient-list/ingredient-row}}
      template block text
    {{/lists/ingredient-list/ingredient-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
