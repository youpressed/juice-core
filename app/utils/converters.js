import { units } from 'juice-core/constants/unit-conversions';
import _ from 'lodash';

const toBest = (q, from, allowed) => {
  const uoms = units[from].list;
  const allowedUoms = allowed || uoms.map(uom => uom.uom);
  const allowedUnits = units[from].list.filter(uom => allowedUoms.includes(uom.uom));

  const castQ = parseFloat(q);
  const baseData = uom(castQ, from).toBase();

  const sorted = _
    .map(allowedUnits, uom => {
      return {
        uom: uom.uom,
        q: (baseData.q / uom.factor)
      }
    })
    .sort((a, b) => Math.abs(1-a.q) - Math.abs(1-b.q))
    .sort((a, b) => {
      if((a.q >= 1) && (b.q >= 1)) {
        return 0;
      } else if((a.q >= 1) && (b.q < 1)) {
        return -1;
      } else {
        return 1;
      }
    });

  return sorted[0];
}

const toMixed = (q, from, allowed) => {
  const uoms = units[from].list;
  const allowedUoms = allowed || uoms.map(uom => uom.uom);
  const allowedUnits = units[from].list.filter(uom => allowedUoms.includes(uom.uom));
  const firstPass = toBest(q, from, allowedUoms);

  const firstUnit = {q:Math.floor(firstPass.q), uom:firstPass.uom};
  const remainder = firstPass.q - firstUnit.q;

  let secondUnit;

  if(remainder > 0) {
    const uoms = units[firstUnit.uom].list;
    const currentUom = uoms.find(uom => uom.uom === firstUnit.uom)
    const nextIndex = allowedUnits.indexOf(currentUom) - 1;
    const nextUom = allowedUnits[nextIndex];

    if(nextUom !== undefined) {
      const next = uom(remainder, firstUnit.uom).to(nextUom.uom);
      secondUnit = {q: Math.floor(next), uom:nextUom.uom};
    }
  }

  return [
    firstUnit,
    secondUnit
  ]
  .filter(measure => measure !== undefined)
  .filter(measure => measure.q > 0);
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
  toMixed,
  uom
}
