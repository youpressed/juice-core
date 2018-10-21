import Component from '@ember/component';

export default Component.extend({
  tag: '',
  timeUoms: Object.freeze(['day(s)', 'week(s)', 'month(s)', 'year(s)'])
});
