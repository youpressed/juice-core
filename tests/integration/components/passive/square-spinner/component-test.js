import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('passive/square-spinner', 'Integration | Component | passive/square spinner', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{passive/square-spinner}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#passive/square-spinner}}
      template block text
    {{/passive/square-spinner}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
