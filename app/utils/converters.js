import { units } from 'juice-core/constants/unit-conversions';
import _ from 'lodash';

const buildAllowedUoms = (from, allowed) => {
  const uoms = units[from].list;
  const allowedUoms = allowed || uoms.map(uom => uom.uom);
  return units[from].list.filter(uom => allowedUoms.includes(uom.uom));
}

const toBest = (q, from, allowed) => {
  const uoms = buildAllowedUoms(from, allowed);

  const castQ = parseFloat(q);
  const baseData = uom(castQ, from).toBase();

  const sorted = _
    .map(uoms, uom => {
      return {
        uom: uom.uom,
        q: (baseData.q / uom.factor)
      }
    })
    .sort((a, b) => Math.abs(1-a.q) - Math.abs(1-b.q))
    .sort((a, b) => {
      if((a.q >= 1) && (b.q >= 1)) {
        return 0;
      } else if((a.q < 1) && (b.q < 1)) {
        return 0;
      } else if((a.q >= 1) && (b.q < 1)) {
        return -1;
      } else {
        return 1;
      }
    });

  return [sorted[0]];
}

const uom = (q, from) => {
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
    to: (newUom) => {
      const toQty = inBaseQty / unitMap[newUom];
      if(Number.isNaN(toQty)) {
        return castQ;
      } else {
        return toQty;
      }
    }
  }
}

export {
  toBest,
  uom
}
