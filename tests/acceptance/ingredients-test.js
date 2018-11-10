import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | ingredients', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/a/ingredients');
  });

  test('displays active ingredients as default', async function (assert) {
    assert.dom('[data-test-label-row]').hasText('Salt');
  });

  test('displays ingredient information correctly', async function(assert) {
    await click('[data-test-label-row]');

    assert.dom('[data-test-node-name]').hasValue('Salt');
  });
});
