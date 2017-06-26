import Ember from 'ember';
import { unitTypes } from 'juice-core/constants/unit-conversions';

export default Ember.Component.extend({
  uoms: unitTypes,
  uom: 'lb',
  
  actions: {
    handleSubmit() {
      const payload = {
        type: 'ingredient',
        label: this.get('label'),
        description: this.get('description'),
        uom: this.get('uom')
      };

      this.get('create')(payload);
      this.get('cancel')();
    }
  }
});
