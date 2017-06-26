import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/icon-label-button', 'Integration | Component | ui/icon label button', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/icon-label-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui/icon-label-button}}
      template block text
    {{/ui/icon-label-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
