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

  return sorted[0];
}

const toMixed = (q, from, allowed) => {
  const uoms = buildAllowedUoms(from, allowed);
  const firstPass = toBest(q, from, allowed);

  const firstUnit = {q: Math.floor(firstPass.q), uom:firstPass.uom};

  const remainder = firstPass.q - firstUnit.q;

  let secondUnit;

  if(remainder > 0) {
    const uoms = units[firstUnit.uom].list;
    const currentUom = uoms.find(uom => uom.uom === firstUnit.uom)
    const nextIndex = uoms.indexOf(currentUom) - 1;
    const nextUom = uoms[nextIndex];

    if(nextUom !== undefined) {
      const next = uom(remainder, firstUnit.uom).to(nextUom.uom);
      secondUnit = {q: next, uom:nextUom.uom};
    }
  }

  let results = [
    firstUnit,
    secondUnit
  ]
  .filter(measure => measure !== undefined)
  .filter(measure => measure.q > 0);

  if(results.length < 1) {
    results = [{q: roundTo(firstPass.q), uom:firstPass.uom}];
  }

  return results;
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
