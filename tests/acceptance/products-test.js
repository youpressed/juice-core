import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | products', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  test('displays production information correctly on view product page', async function(assert) {
    await visit('/products/product-id1');
    await click('[data-test-date-row-label]');
    await click('[data-test-production-name]');

    assert.dom('[data-test-desc-input="input-node-name"]').hasValue('Tasty Salad');
    assert.dom('[data-test-desc-input="input-node-qty"]').hasValue('3');
    assert.dom('[data-test-node-active]').isChecked();

    assert.dom('[data-test-line-item-name]').hasText('Salty Sauce');
    assert.dom('[data-test-line-item-qty]').hasValue('10');
  });
});
