import { module, test } from 'qunit';
import { visit, click, currentURL } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | Recipes', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/a/recipes');
  });

  test('displays recipes', async function (assert) {
    assert.dom('[data-test-label-row]').exists({count: 2})
  });

  test('be able to create a recipe', async function(assert) {
    await click('[data-test-create-button]');

    assert.dom('[data-test-page-title]').hasText('EDIT PREP ITEM');
  });

  test('be able to open recipe show page', async function(assert) {
    await click('[data-test-label-row]');

    assert.equal(currentURL(), '/a/recipes/recipe-id1');
  });
});
