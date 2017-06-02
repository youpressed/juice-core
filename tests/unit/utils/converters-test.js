import { toMixed, toBest } from 'juice-core/utils/converters';
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

test('it correctly formats small numbers', function(assert) {
  const conversion = toMixed(0.75, 'tsp');
  const expectedResult = [
    {q:'0.8', uom:'tsp'}
  ];

  assert.deepEqual(conversion, expectedResult);
});

test('it only uses allowed formats', function(assert) {
  const conversion = toMixed(1, 'qt', ['tsp']);
  const expectedResult = [
    {q:192, uom:'tsp'}
  ];

  assert.deepEqual(conversion, expectedResult);
});

test('converts to simplest uom', function(assert) {
  const conversion = toMixed(192, 'tsp');
  const expectedResult = [
    {q:1, uom:'qt'}
  ];

  assert.deepEqual(conversion, expectedResult);
});

test('toBest converts to simplest uom', function(assert) {
  const conversion = toBest(192, 'tsp');
  const expectedResult = {q:1, uom:'qt'};

  assert.deepEqual(conversion, expectedResult);
});

test('toBest converts to simplest uom of allowedUoms', function(assert) {
  const conversion = toBest(400, 'tsp', ['tbs', 'tsp']);
  const expectedResult = {q:133.33333333333331, uom:'tbs'};

  assert.deepEqual(conversion, expectedResult);
});
