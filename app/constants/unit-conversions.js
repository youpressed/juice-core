const volumes = {
  base:'floz',
  map: {
    tsp: 1/6,
    tbs: 1/2,
    floz: 1,
    cup: 8,
    qt: 32
  },
  list: [
    {uom: 'tsp', factor: 1/6},
    {uom: 'tbs', factor: 1/2},
    {uom: 'floz', factor: 1},
    {uom: 'cup', factor: 8},
    {uom: 'qt', factor: 32}
  ]
}

const weights = {
  base:'lb',
  map: {
    g: 1/453.592,
    oz: 1/16,
    lb: 1,
    kg: 2.20462/1
  },
  list: [
    {uom: 'g', factor: 1/453.592},
    {uom: 'oz', factor: 1/16},
    {uom: 'lb', factor: 1},
    {uom: 'kg', factor: 2.20462/1}
  ]
}

const counts = {
  base:'count',
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
  qt: volumes,
  oz: weights,
  lb: weights,
  g: weights,
  kg: weights,
  count: counts
};

const unitTypes = [
  'tsp',
  'tbs',
  'floz',
  'cup',
  'qt',
  'oz',
  'lb',
  'g',
  'kg',
  'count'
];

export {
  units,
  unitTypes
}
