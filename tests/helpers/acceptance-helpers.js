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

export function initAcceptanceTest(hooks, fireBaseFixture) {
  setupApplicationTest(hooks);
  clearLocalStorage(hooks);
  mockAuth(hooks);
  mockFirebaseData(hooks, fireBaseFixture);
}
