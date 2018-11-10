import Component from '@ember/component';

export default Component.extend({
  color: 'none',
  click() {
    this.get('onClick')();
  }
});
