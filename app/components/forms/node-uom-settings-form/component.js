import Component from '@ember/component';

export default Component.extend({
  actions: {
    async addUom(uoms) {
      const forcedUoms = uoms.join(',');
      await this.get("handleUpdate")(this.get("model"), "forceUoms", forcedUoms);
    }
  }
});
