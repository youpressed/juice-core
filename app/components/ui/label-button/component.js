import Component from '@ember/component';

export default Component.extend({
  click() {
    this.get('onClick')();
  }
});
