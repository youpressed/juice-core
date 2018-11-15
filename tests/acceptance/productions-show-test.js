import { module, test } from 'qunit';
import { visit, click, triggerKeyEvent, typeIn } from '@ember/test-helpers';

import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | Productions | Show', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/a/productions/production-id');
  });

  test('shows production information correctly', async function (assert) {
    assert.dom('[data-test-line-item-row] [data-test-label]').includesText('Tasty Salad');
    assert.dom('[data-test-edge-quantity] input').hasValue('10');
  });

  test('be able to add item for adjusting', async function (assert) {
    // Open Adjusting tab
    await click('[data-test-tab-title="1"]');

    assert.dom('[data-test-node-children] [data-test-line-item-row]').exists({count: 1});

    await typeIn('[data-test-search-input]', 'Sa');
    await triggerKeyEvent('[data-test-search-input]', 'keydown', 13) // enter

    assert.dom('[data-test-node-children] [data-test-line-item-row]').exists({count: 2});
  });
});
