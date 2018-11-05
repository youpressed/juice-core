import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | ingredients', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/authenticated/ingredients');
    await click('[data-test-menu-toggle-button]');
    await click('[data-test-menu-item-ingredients]');
  });

  test('displays active ingredients as default', async function (assert) {
    assert.dom('[data-test-label-row-label]').exists({count: 1});
    assert.dom('[data-test-label-row-label]').hasText('Salt');
  });

  test('displays ingredient information correctly', async function(assert) {
    await click('[data-test-label-row-label]');

    assert.dom('[data-test-desc-input="input-node-name"]').hasValue('Salt');
    assert.dom('[data-test-desc-input="input-node-qty"]').hasValue('5');
    assert.dom('[data-test-node-active]').isChecked();
  });
});
