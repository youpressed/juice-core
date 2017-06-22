import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cards/recipe-card', 'Integration | Component | cards/recipe card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cards/recipe-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cards/recipe-card}}
      template block text
    {{/cards/recipe-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
