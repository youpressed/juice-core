import { units } from 'juice-core/constants/unit-conversions';
import _ from 'lodash';

const toBest = function(qty, from, precision = 1) {
  const inBaseQty = uom(qty, from).toBase();

  const sorted = _
    .map(units[from].list, measure => {
      return {
        uom: measure.uom,
        qty: (inBaseQty / measure.factor).toFixed(precision)
      }
    })
    .sort((a, b) => Math.abs(1-a.qty) - Math.abs(1-b.qty));

  return sorted[0];
}

const uom = function(qty, from) {
  const unitMap = units[from].map;
  const inBaseQty = qty / unitMap[from];

  return {
    toBase: () => inBaseQty,
    to: (newUom, precision = 1) => (inBaseQty / unitMap[newUom]).toFixed(precision)
  }
}

export {
  toBest,
  uom
}
