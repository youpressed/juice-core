import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | Products', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/a/products');
  });

  test('displays products', async function (assert) {
    assert.dom('[data-test-label-row]').hasText('Tasty Salad');
  });

  test('be able to create a product', async function(assert) {
    await click('[data-test-create-button]');

    assert.dom('[data-test-page-title]').hasText('Edit Product');
  });

  test('be able to open product show page', async function(assert) {
    await click('[data-test-label-row]');

    assert.equal(currentURL(), '/a/products/product-id1');
  });

});
