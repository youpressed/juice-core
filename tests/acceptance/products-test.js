import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | products', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  test('displays active products as default', async function (assert) {
    await visit('/a/products');

    assert.dom('[data-test-label-row]').hasText('Tasty Salad');
  });

  test('displays product information correctly', async function(assert) {
    await visit('/a/products/product-id1');

    assert.dom('[data-test-node-name]').hasValue('Tasty Salad');
    assert.dom('[data-test-line-item-row] [data-test-label]').hasText('Salty Sauce');
    assert.dom('[data-test-edge-quantity] input').hasValue('4');
  });
});
