import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | Productions', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  test('shows date and total units of productions', async function(assert) {
    await visit('/a/productions');

    assert.dom('[data-test-date-row-label]').includesText('04/07/2018');
    assert.dom('[data-test-date-row-total-count]').includesText('10');
  });

  test('be able to create a production', async function(assert) {
    await visit('/a/productions');
    await click('[data-test-create-button]');

    assert.dom('[data-test-page-title]').hasText('Edit Productions');
  });
});
