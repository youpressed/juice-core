import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | Ingredients', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/a/ingredients');
  });

  test('displays active ingredients as default', async function (assert) {
    assert.dom('[data-test-label-row]').hasText('Salt');
  });

  test('be able to create a ingredient', async function(assert) {
    await click('[data-test-create-button]');

    assert.dom('[data-test-page-title]').hasText('EDIT INGREDIENT');
  });

  test('be able to open ingredient show page', async function(assert) {
    await click('[data-test-label-row]');

    assert.equal(currentURL(), '/a/ingredients/ingredient-id1');
  });
});
