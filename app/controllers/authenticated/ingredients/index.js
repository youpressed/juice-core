import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  store: inject(),

  actions: {
    showNode(node) {
      this.transitionToRoute('authenticated.ingredients.show', node.get('id'));
    },

    handleUpdate(model, key, val) {
      model.set(key, val);
      model.save();
    },

    async createNode() {
      const node = this.get('store').createRecord("node", {
        type:"ingredient",
        label:"untitled",
        yield: 1,
        uom: "lb"
      });

      await node.save();

      this.transitionToRoute('authenticated.ingredients.show', node.get('id'));
    }
  }
});
