import Ember from 'ember';
import { uom } from 'juice-core/utils/converters';

export function nearestVolume(params) {
  return {
    uom: params[2],
    qty:uom(params[0], params[1]).to(params[2])
  };
}

export default Ember.Helper.helper(nearestVolume);
