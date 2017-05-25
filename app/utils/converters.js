import { volumes } from 'juice-core/constants/volume-conversions';
import _ from 'lodash';

const toBest = function(vol, uom) {
  const sorted = _
    .clone(volumes.list)
    .map(measure => {
      return {
        uom: measere.uom,
        qty: vol * measure.factor
      }
    })
    .sort((a, b) => Math.abs(1-a.qty) - Math.abs(1-b.qty));

  return sorted[0];
}

export {
  toBest
}
