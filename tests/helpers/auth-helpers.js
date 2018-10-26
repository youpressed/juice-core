import sessionFixture from '../fixtures/session-default';

import {
  mockAuthFirebase
} from './firebase-helpers';

import {
  mockAuth0Lock
} from './auth0-helpers';

export function mockAuth(hooks) {
  hooks.beforeEach(async function () {
    await mockAuth0Lock(this, sessionFixture);
    mockAuthFirebase(this);
  });
}
