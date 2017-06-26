import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('navs/drop-down-menu', 'Integration | Component | navs/drop down menu', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{navs/drop-down-menu}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#navs/drop-down-menu}}
      template block text
    {{/navs/drop-down-menu}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
