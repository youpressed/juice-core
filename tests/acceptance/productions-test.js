import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

import fireBaseFixture from '../fixtures/firebase-production-default';
import sessionFixture from '../fixtures/session-default';

import {
  mockFirebase,
  mockAuthFirebase
} from '../helpers/firebase-helpers';

import {
  mockAuth0Lock
} from '../helpers/auth0-helpers';

import {
  clearLocalStorage
} from 'juice-core/tests/helpers';

module('Acceptance | productions', function(hooks) {
  setupApplicationTest(hooks);
  clearLocalStorage(hooks);

  test('shows current date and total units', async function(assert) {
    await mockAuth0Lock(this, sessionFixture);

    mockAuthFirebase(this);
    mockFirebase(this, fireBaseFixture);

    await visit('/productions');
    assert.equal(currentURL(), '/productions');

    assert.dom('[data-test-id="date-row-date-label"]').hasText('Sun - 04/08');
    assert.dom('[data-test-id="date-row-total-count"]').hasText('25');
  });
});
