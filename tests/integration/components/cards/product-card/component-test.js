import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cards/product-card', 'Integration | Component | cards/product card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cards/product-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cards/product-card}}
      template block text
    {{/cards/product-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
