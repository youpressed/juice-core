import { helper as buildHelper } from '@ember/component/helper';
import { toMixed } from 'juice-core/utils/converters';

export function helper(params) {
  return toMixed(params[0], params[1], params[2]);
}

export default buildHelper(helper);
