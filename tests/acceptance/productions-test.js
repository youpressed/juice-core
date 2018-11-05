import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | productions', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  test('shows date and total units of productions', async function(assert) {
    await visit('/authenticated/productions');

    assert.dom('[data-test-date-row-label]').hasText('Sat - 04/07');
    assert.dom('[data-test-date-row-total-count]').hasText('25');
  });

  test('shows production information correctly', async function (assert) {
    await visit('/authenticated/productions/production-id');

    assert.dom('[data-test-production-date-row] input').hasValue('Sat 04/07/18');
    assert.dom('[data-test-production-name]').exists({ count: 2 });

    assert.dom('[data-test-production-name]').hasText('Tasty Salad');
    assert.dom('[data-test-production-child-quantity]').hasValue('10');
  });
});
