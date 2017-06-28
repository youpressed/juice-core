import Ember from 'ember';

export function nodeLinkPath(params/*, hash*/) {
  const model = params[0];
  const type = model.get('type');

  return `${type}s.show`;
}

export default Ember.Helper.helper(nodeLinkPath);
