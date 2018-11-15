import { module, test } from 'qunit';
import { visit, click, triggerKeyEvent, typeIn, currentURL, waitUntil, find } from '@ember/test-helpers';

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

  test('be able to view a product in details', async function (assert) {
    await click('[data-test-make-tab] [data-test-label]');

    assert.equal(currentURL(), '/a/products/product-id1');
  });

  test('be able to add item for adjusting', async function (assert) {
    // Open Adjusting tab
    await click('[data-test-tab-title="1"]');

    assert.dom('[data-test-node-children] [data-test-line-item-row]').exists({count: 1});

    await typeIn('[data-test-search-input]', 'Sa');
    await triggerKeyEvent('[data-test-search-input]', 'keydown', 13) // enter

    assert.dom('[data-test-node-children] [data-test-line-item-row]').exists({count: 2});
  });

  test('be able to view an ingredient or a recipe in details', async function (assert) {
    // Open Adjusting tab
    await click('[data-test-tab-title="1"]');
    await click('[data-test-node-children] [data-test-label]')

    assert.equal(currentURL(), '/a/recipes/recipe-id1');
  });

  test('be able to delete an adjusting', async function (assert) {
    // Open Adjusting tab
    await click('[data-test-tab-title="1"]');

    assert.dom('[data-test-node-children] [data-test-line-item-row]').exists({count: 1});

    await click('[data-test-node-children] [data-test-select]');
    await click('[data-test-node-children] [data-test-delete-button]');

    await waitUntil(() => !find('[data-test-node-children] [data-test-line-item-row]'));

    assert.dom('[data-test-node-children] [data-test-line-item-row]').exists({count: 0});
  });
});
