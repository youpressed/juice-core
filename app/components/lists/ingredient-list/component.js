import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  yoson: computed('model', function(){
    const data = this.get('model');
    return Object.keys(data)
      .map(key => {
        const obj = data[key];
        return {
          label: obj.label,
          type: obj.type,
          factor: obj.factor
        }
      })
      .filter(obj => obj.type === 'ingredient')
  })
});
