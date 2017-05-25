import Ember from 'ember';
import { toBest } from 'juice-core/utils/converters';

export function nearestVolume(params/*, hash*/) {
  // debugger;
  return toBest(params[0]);
  // return params;
}

export default Ember.Helper.helper(nearestVolume);
