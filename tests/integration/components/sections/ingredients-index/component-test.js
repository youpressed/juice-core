import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/ingredients-index', 'Integration | Component | sections/ingredients index', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sections/ingredients-index}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sections/ingredients-index}}
      template block text
    {{/sections/ingredients-index}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
