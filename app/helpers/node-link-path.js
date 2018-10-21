import { helper as buildHelper } from '@ember/component/helper';

export function nodeLinkPath(params/*, hash*/) {
  const model = params[0];
  const type = model.get('type');

  return `${type}s.show`;
}

export default buildHelper(nodeLinkPath);
