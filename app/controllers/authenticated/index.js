import Controller from '@ember/controller';
import { notEmpty } from '@ember/object/computed';

export default Controller.extend({
  hasProducts: notEmpty("model")
});
