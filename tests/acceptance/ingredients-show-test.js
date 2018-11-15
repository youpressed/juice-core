import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';

import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | Ingredients | Show', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/a/ingredients/ingredient-id1');
  });

  test('displays ingredient information correctly', async function(assert) {
    assert.dom('[data-test-node-name]').hasValue('Salt');
  });

  test('be able to delete the current ingredient', async function (assert) {
    await click('[data-test-delete-node-button]');
    await click('[data-test-dialog-button]');

    assert.equal(currentURL(), '/a/ingredients');
  });
});
