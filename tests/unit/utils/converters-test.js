import { toMixed } from 'juice-core/utils/converters';
import { module, test } from 'qunit';

module('Unit | Utility | converters');

test('it creates mixed measures', function(assert) {
  const conversion = toMixed(108, 'floz');
  const expectedResult = [
    {q:3, uom:'qt'},
    {q:12, uom:'floz'}
  ];

  assert.deepEqual(conversion, expectedResult);
});
