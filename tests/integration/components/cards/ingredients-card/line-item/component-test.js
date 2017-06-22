import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cards/ingredients-card/line-item', 'Integration | Component | cards/ingredients card/line item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cards/ingredients-card/line-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cards/ingredients-card/line-item}}
      template block text
    {{/cards/ingredients-card/line-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
