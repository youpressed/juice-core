import Component from '@ember/component';
import _ from 'lodash';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    let panels = _.map(this.childViews, v => _.pick(v, ['title', 'elementId']));
    this.set('panels', panels);
    this.set('activeId', _.first(panels).elementId);
  }
});
