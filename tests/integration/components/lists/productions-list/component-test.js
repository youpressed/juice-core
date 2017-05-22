import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lists/productions-list', 'Integration | Component | lists/productions list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lists/productions-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lists/productions-list}}
      template block text
    {{/lists/productions-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
