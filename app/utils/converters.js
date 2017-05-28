import { units } from 'juice-core/constants/unit-conversions';
import _ from 'lodash';

const toBest = function(q, from, precision = 1) {
  const castQ = parseFloat(q);
  const baseData = uom(castQ, from).toBase();

  const sorted = _
    .map(units[from].list, measure => {
      return {
        uom: measure.uom,
        q: (baseData.q / measure.factor).toFixed(precision)
      }
    })
    .sort((a, b) => Math.abs(1-a.q) - Math.abs(1-b.q));

  return sorted[0];
}

const uom = function(q, from) {
  const castQ = parseFloat(q);
  const unitData = units[from];
  const baseUom = unitData.base;
  const unitMap = unitData.map;
  const inBaseQty = castQ * unitMap[from];

  return {
    toBase: () => {
      return {
        q: inBaseQty,
        uom: baseUom
      }
    },
    to: (newUom, precision = 1) => {
      const toQty = inBaseQty / unitMap[newUom];
      if(Number.isNaN(toQty)) {
        return castQ.toFixed(precision);
      } else {
        return toQty.toFixed(precision);
      }
    }
  }
}

export {
  toBest,
  uom
}
