import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | Productions', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/a/productions');
  });

  test('shows date and total units of productions', async function(assert) {
    assert.dom('[data-test-date-row-label]').includesText('04/07/2018');
    assert.dom('[data-test-date-row-total-count]').includesText('25');
  });

  test('be able to create a production', async function(assert) {
    await click('[data-test-create-button]');

    assert.dom('[data-test-page-title]').hasText('Edit Productions');
  });

  test('be able to open production show page', async function(assert) {
    await click('[data-test-date-row-label]');

    assert.equal(currentURL(), '/a/productions/production-id');
  });

  test('be able to delete a production', async function (assert) {
    assert.dom('[data-test-date-row-label]').exists({count: 1});

    await click('[data-test-delete-item-button]');
    await click('[data-test-dialog-button]');

    assert.dom('[data-test-date-row-label]').exists({count: 0});
  });
});
