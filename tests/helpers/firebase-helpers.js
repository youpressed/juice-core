import destroyFirebaseApps from 'juice-core/tests/helpers/destroy-firebase-apps';
import stubFirebase from 'juice-core/tests/helpers/stub-firebase';
import createOfflineRef from 'juice-core/tests/helpers/create-offline-ref';

function mockAuthFirebase(context) {
  // Mock the firebase auth method to noop so we can skip the JWT
  // Will auto login when we call fb.auth().signInWithCustomToken();
  const firebaseApp = context.owner.lookup('service:firebaseApp');
  firebaseApp.auth = () => ({
    signInWithCustomToken: () => ({
      catch: () => ({})
    }),
    signOut: () => ({})
  });
}

async function mockFirebase(context, fixtureData = {}) {
  // This mocks all data methods to return CBs right away in offline mode
  stubFirebase();

  // Create the ref, turn it to offline mode and add fixture data
  const fbRef = createOfflineRef(fixtureData);

  // Wire everything up
  context.owner.register('service:firebaseMock', fbRef, {instantiate: false, singleton: true});
  context.owner.inject('adapter:firebase', 'firebase', 'service:firebaseMock');
  context.owner.inject('adapter:application', 'firebase', 'service:firebaseMock');
}

async function teardownFirebase(context) {
  const instance = context.owner.lookup('service:firebaseMock');

  if(instance) {
    context.owner.unregister('service:firebaseMock');
  }

  return await destroyFirebaseApps();
}

function mockFirebaseData(hooks, fixtureData) {
  hooks.beforeEach(function () {
    mockFirebase(this, fixtureData);
  });
}

export {
  mockFirebase,
  mockFirebaseData,
  teardownFirebase,
  mockAuthFirebase
}
