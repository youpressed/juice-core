import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['grid-noGutter-middle'],

  session: Ember.inject.service()
});
