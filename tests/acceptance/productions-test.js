import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import fireBaseFixture from '../fixtures/firebase-production-default';

import {
  initAcceptanceTest
} from '../helpers/acceptance-helpers';

module('Acceptance | productions', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/productions');
  });

  test('shows date and total units of production', async function(assert) {
    assert.dom('[data-test-date-row-label]').hasText('Sun - 04/08');
    assert.dom('[data-test-date-row-total-count]').hasText('25');
  });
});
