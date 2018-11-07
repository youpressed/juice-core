import Component from '@ember/component';

export default Component.extend({
  actions: {
    setValue(value){
      this.set('value', value);
    }
  }
});
