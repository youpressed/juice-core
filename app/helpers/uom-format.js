import { helper } from '@ember/component/helper';

const GRAM = {
  short: 'gr',
  full: 'gram'
}

const COUNT = {
  short: 'ct',
  full: 'count'
}

const LEGEND = {
  'g': GRAM,
  'gr': GRAM,
  'gram': GRAM,

  'c': COUNT,
  'ct': COUNT,
  'count': COUNT
}

export function uomFormat(params) {
  const key = params[0];
  const type = params[1] || 'short';
  const group = LEGEND[key];

  if(group) {
    return group[type];
  } else {
    return params[0]
  }
}

export default helper(uomFormat);
