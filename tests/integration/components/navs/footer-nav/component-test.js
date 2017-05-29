import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('navs/footer-nav', 'Integration | Component | navs/footer nav', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{navs/footer-nav}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#navs/footer-nav}}
      template block text
    {{/navs/footer-nav}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
