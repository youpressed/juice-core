import Ember from 'ember';
import { toBest } from 'juice-core/utils/converters';

export function nearestVolume(params) {
  return toBest(params[0], params[1], params[2]);
}

export default Ember.Helper.helper(nearestVolume);
