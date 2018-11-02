import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | login', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  test('logs user and sets correct tenant data', async function(assert) {
    await visit('/login');

    assert.dom('[data-test-date-row]').exists({count: 1})
  });
});
