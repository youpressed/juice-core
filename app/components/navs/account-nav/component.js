import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ["absolute pin-t pin-r mr-8 mt-8"],

  session: service()
});
