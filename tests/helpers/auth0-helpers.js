import { waitUntil } from '@ember/test-helpers';
import RSVP from 'rsvp';

function mockAuth0Lock(context, sessionFixture) {
  const mockAuth0ShowLock = () => RSVP.resolve({profile: sessionFixture});
  const auth0 = context.owner.lookup('service:auth0');

  auth0.showLock = mockAuth0ShowLock;
  return waitUntil(mockAuth0ShowLock);
}

export {
  mockAuth0Lock
}
