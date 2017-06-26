import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dialogs/new-ingredient', 'Integration | Component | dialogs/new ingredient', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dialogs/new-ingredient}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dialogs/new-ingredient}}
      template block text
    {{/dialogs/new-ingredient}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
