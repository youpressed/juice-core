import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | recipes', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/a/recipes');
  });

  test('displays active recipes as default', async function (assert) {
    assert.dom('[data-test-label-row-label]').exists({count: 1});
    assert.dom('[data-test-label-row-label]').hasText('Tomato Sauce');
  });

  test('displays recipe information correctly', async function(assert) {
    await click('[data-test-label-row-label]');

    assert.dom('[data-test-desc-input="input-node-name"]').hasValue('Tomato Sauce');
    assert.dom('[data-test-desc-input="input-node-qty"]').hasValue('2');
    assert.dom('[data-test-node-active]').isChecked();

    assert.dom('[data-test-line-item-name]').hasText('Salt');
    assert.dom('[data-test-line-item-qty]').hasValue('7');
  });
});
