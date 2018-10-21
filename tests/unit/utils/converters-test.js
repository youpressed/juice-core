import { toBest } from 'juice-core/utils/converters';
import { module, test } from 'qunit';

module('Unit | Utility | converters', function() {

  test('toBest converts to simplest uom', function(assert) {
    const conversion = toBest(192, 'tsp');
    const expectedResult = [{q:1, uom:'qt'}];

    assert.deepEqual(conversion, expectedResult);
  });

  test('toBest converts to simplest uom of allowedUoms', function(assert) {
    const conversion = toBest(400, 'tsp', ['tbs', 'tsp']);
    const expectedResult = [{q:133.33333333333331, uom:'tbs'}];

    assert.deepEqual(conversion, expectedResult);
  });
  
});
