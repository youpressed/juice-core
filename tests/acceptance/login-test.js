import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

import fireBaseFixture from '../fixtures/firebase-default';
// import fireBaseFixture2 from '../fixtures/firebase-default2';
import sessionFixture from '../fixtures/session-default';

import { authenticateSession } from 'ember-simple-auth/test-support';

import {
  mockFirebase,
  // teardownFirebase,
  mockAuthFirebase
} from '../helpers/firebase-helpers';

import {
  mockAuth0Lock
} from '../helpers/auth0-helpers';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(function() {
    // teardownFirebase(this);
  });

  test('logs user and sets correct tenant data', async function(assert) {
    mockAuthFirebase(this);
    mockFirebase(this, fireBaseFixture);

    await mockAuth0Lock(this, sessionFixture);

    await visit('/login');

    assert.dom('[data-test-id="date-label-row"]').exists({count: 1})
  });

  test('defaults to landing page on login', async function(assert) {
    mockFirebase(this);
    authenticateSession();

    await visit('/login');

    assert.equal(currentURL(), '/productions');
  });
});
