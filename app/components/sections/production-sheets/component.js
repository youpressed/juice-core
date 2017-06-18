import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    showSetting() {
      this.set('shouldShowSettings', true);
    },

    closeSetting() {
      console.log("called");
      this.set('shouldShowSettings', false);
    }
  }
});
