const volumes = {
  map: {
    tsp: 1/6,
    tbs: 1/2,
    floz: 1,
    cup: 8,
    pnt: 16,
    qt: 32,
    gal: 128
  },
  list: [
    {uom: 'tsp', factor: 1/6},
    {uom: 'tbs', factor: 1/2},
    {uom: 'floz', factor: 1},
    {uom: 'cup', factor: 8},
    {uom: 'pnt', factor: 16},
    {uom: 'qt', factor: 32},
    {uom: 'gal', factor: 128}
  ]
}

const weights = {
  map: {
    oz: 1/16,
    lb: 1
  },
  list: [
    {uom: 'oz', factor: 1/16},
    {uom: 'lb', factor: 1}
  ]
}

const counts = {
  map: {
    count: 1
  },
  list: [
    {uom: 'count', factor: 1}
  ]
}

const units = {
  tsp: volumes,
  tbs: volumes,
  floz: volumes,
  cup: volumes,
  pnt: volumes,
  qt: volumes,
  gal: volumes,
  oz: weights,
  lb: weights,
  count: counts
};

const unitTypes = [
  'tsp',
  'tbs',
  'floz',
  'cup',
  'pnt',
  'qt',
  'gal',
  'oz',
  'lb',
  'count'
];

export {
  units,
  unitTypes
}
