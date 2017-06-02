import Ember from 'ember';

export function round(params) {
  const val = params[0];
  const precision = params[1] !== undefined ? params[1] : 1;

  const parsed = parseFloat(val);
  return parsed.toFixed(precision);
}

export default Ember.Helper.helper(round);
