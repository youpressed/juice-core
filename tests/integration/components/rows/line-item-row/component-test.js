import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rows/line-item-row', 'Integration | Component | rows/line item row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{rows/line-item-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#rows/line-item-row}}
      template block text
    {{/rows/line-item-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
