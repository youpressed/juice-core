import { setupApplicationTest } from 'ember-qunit';

import {
  clearLocalStorage
} from 'juice-core/tests/helpers';

import {
  mockFirebaseData
} from './firebase-helpers';

import {
  mockAuth
} from './auth-helpers';

import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';

export function initAcceptanceTest(hooks, fireBaseFixture) {
  setupApplicationTest(hooks);
  clearLocalStorage(hooks);
  mockAuth(hooks);
  mockFirebaseData(hooks, fireBaseFixture);
  setupMirageTest(hooks);
}
