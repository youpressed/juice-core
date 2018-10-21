import { helper as buildHelper } from '@ember/component/helper';
import { toBest } from 'juice-core/utils/converters';

export function nearestVolume(params) {
  return toBest(params[0], params[1], params[2]);
}

export default buildHelper(nearestVolume);
