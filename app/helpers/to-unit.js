import { helper as buildHelper } from '@ember/component/helper';
import { uom } from 'juice-core/utils/converters';

export function nearestVolume(params) {
  return {
    uom: params[2],
    qty:uom(params[0], params[1]).to(params[2])
  };
}

export default buildHelper(nearestVolume);
