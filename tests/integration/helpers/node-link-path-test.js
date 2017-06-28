
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('node-link-path', 'helper:node-link-path', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{node-link-path inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

