import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | Authenticated | Index', function(hooks) {
  initAcceptanceTest(hooks, {});

  hooks.beforeEach(async () => {
    await visit('/a');
  });

  test('displays welcome message', async function (assert) {
    assert.dom('[data-test-header]').hasText('Welcome to You Pressed');
  });

  test('be able to create a product', async function(assert) {
    await click('[data-test-create-button]');
    assert.dom('[data-test-page-title]').hasText('Edit Product');
  });
});
