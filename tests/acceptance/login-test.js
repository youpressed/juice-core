import { module, test } from 'qunit';
import { visit,
  // currentURL
 } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

import fireBaseFixture from '../fixtures/firebase-default';
import sessionFixture from '../fixtures/session-default';

// import { authenticateSession } from 'ember-simple-auth/test-support';

import {
  mockFirebase,
  mockAuthFirebase
} from '../helpers/firebase-helpers';

import {
  mockAuth0Lock
} from '../helpers/auth0-helpers';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(() => {
    // console.log('');
  });

  test('logs user and sets correct tenant data', async function(assert) {
    await mockAuth0Lock(this, sessionFixture);

    mockAuthFirebase(this);
    mockFirebase(this, fireBaseFixture);

    await visit('/login');

    assert.dom('[data-test-id="date-label-row"]').exists({count: 1})
  });

  test('logs user and sets correct tenant data', async function(assert) {
    await mockAuth0Lock(this, sessionFixture);

    mockAuthFirebase(this);
    mockFirebase(this, fireBaseFixture);

    await visit('/login');

    assert.dom('[data-test-id="date-label-row"]').exists({count: 1})
  });

  test('logs user and sets correct tenant data', async function(assert) {
    await mockAuth0Lock(this, sessionFixture);

    mockAuthFirebase(this);
    mockFirebase(this, fireBaseFixture);

    await visit('/login');

    assert.dom('[data-test-id="date-label-row"]').exists({count: 1})
  });

  test('logs user and sets correct tenant data', async function(assert) {
    await mockAuth0Lock(this, sessionFixture);

    mockAuthFirebase(this);
    mockFirebase(this, fireBaseFixture);

    await visit('/login');

    assert.dom('[data-test-id="date-label-row"]').exists({count: 1})
  });

  test('logs user and sets correct tenant data', async function(assert) {
    await mockAuth0Lock(this, sessionFixture);

    mockAuthFirebase(this);
    mockFirebase(this, fireBaseFixture);

    await visit('/login');

    assert.dom('[data-test-id="date-label-row"]').exists({count: 1})
  });

  test('logs user and sets correct tenant data', async function(assert) {
    await mockAuth0Lock(this, sessionFixture);

    mockAuthFirebase(this);
    mockFirebase(this, fireBaseFixture);

    await visit('/login');

    assert.dom('[data-test-id="date-label-row"]').exists({count: 1})
  });

  test('logs user and sets correct tenant data', async function(assert) {
    await mockAuth0Lock(this, sessionFixture);

    mockAuthFirebase(this);
    mockFirebase(this, fireBaseFixture);

    await visit('/login');

    assert.dom('[data-test-id="date-label-row"]').exists({count: 1})
  });

  test('logs user and sets correct tenant data', async function(assert) {
    await mockAuth0Lock(this, sessionFixture);

    mockAuthFirebase(this);
    mockFirebase(this, fireBaseFixture);

    await visit('/login');

    assert.dom('[data-test-id="date-label-row"]').exists({count: 1})
  });
  

  // test('defaults to landing page on login', async function(assert) {
  //   mockFirebase(this);
  //   authenticateSession();
  //
  //   await visit('/login');
  //
  //   assert.equal(currentURL(), '/productions');
  // });
});
