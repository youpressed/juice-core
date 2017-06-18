import Ember from 'ember';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Service.extend({
  firebaseApp: service(),
  store: service(),

  manage(data) {
    this.set('userId', data.fbid);
    this.set('orgId',  data.org);

    const tenantRef = this.get('firebaseApp').database().ref(`orgs/${data.org}`);

    this.get('store').adapterFor('application')._ref = tenantRef;
  }
});
