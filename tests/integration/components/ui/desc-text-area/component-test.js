import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/desc-text-area', 'Integration | Component | ui/desc text area', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/desc-text-area}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui/desc-text-area}}
      template block text
    {{/ui/desc-text-area}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
