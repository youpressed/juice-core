import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lists/productions-list/production-row', 'Integration | Component | lists/productions list/production row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lists/productions-list/production-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lists/productions-list/production-row}}
      template block text
    {{/lists/productions-list/production-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
