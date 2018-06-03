import Ember from 'ember';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Service.extend({
  firebaseApp: service(),
  intercom: service(),
  store: service(),

  manage(data) {
    this.get('intercom').set('user.name', data.email);
    this.get('intercom').set('user.email', data.email);

    this.set('userId', data['https://app.youpressed.com/fbId']);
    this.set('orgId',  data['https://app.youpressed.com/org']);

    const tenantRef = this.get('firebaseApp').database().ref(`orgs/${data['https://app.youpressed.com/org']}`);

    this.get('store').adapterFor('application')._ref = tenantRef;
  }
});
