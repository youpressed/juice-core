import Ember from 'ember';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Service.extend({
  firebaseApp: service(),
  intercom: service(),
  store: service(),

  email: alias('data.email'),

  userId: computed('data', function() {
    return this.get('data')['https://app.youpressed.com/fbId'];
  }),

  orgId: computed('data', function() {
    return this.get('data')['https://app.youpressed.com/org'];
  }),

  fbRefURL: computed('orgId', function() {
    return `orgs/${this.get('orgId')}`;
  }),

  manage(data) {
    console.log(data);
    this.set('data', data);

    this.setupFB();
    this.setupIntercom();
  },

  setupFB() {
    console.log(this.get('fbRefURL'));

    const orgRef = this.get('firebaseApp')
      .database()
        .ref(this.get('fbRefURL'));

    this.set('fbRef', orgRef);

    // Update internal ref to point to tenant
    this.get('store').adapterFor('application')._ref = this.get('fbRef');
  },

  setupIntercom() {
    this.get('intercom').set('user.name', this.get('email'));
    this.get('intercom').set('user.email', this.get('email'));
  },
});
