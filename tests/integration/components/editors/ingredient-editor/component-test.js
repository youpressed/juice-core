import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('editors/ingredient-editor', 'Integration | Component | editors/ingredient editor', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{editors/ingredient-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#editors/ingredient-editor}}
      template block text
    {{/editors/ingredient-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
