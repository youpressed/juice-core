import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | productions', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  test('shows date and total units of productions', async function(assert) {
    await visit('/a/productions');

    assert.dom('[data-test-date-row-label]').includesText('04/07/2018');
    assert.dom('[data-test-date-row-total-count]').includesText('25');
  });

  test('shows production information correctly', async function (assert) {
    await visit('/a/productions/production-id');

    assert.dom('[data-test-line-item-row] [data-test-label]').includesText('Tasty Salad');
    assert.dom('[data-test-edge-quantity] input').hasValue('10');
  });
});
