import Service, { inject as service }  from '@ember/service';

export default Service.extend({
  store: service(),

  async createProduct() {
    let products = await this.get("store").query('node', {
      orderBy: "type",
      equalTo: "product"
    })

    const sortedProducts = products.sortBy('position');

    const firstProduct = sortedProducts[0];

    let nextPosition = -1;

    if(firstProduct !== undefined) {
      if(firstProduct.get('position') !== undefined) {
        nextPosition = firstProduct.get('position') - 1;
      }
    }

    const node = this.get("store").createRecord("node", {
      type:"product",
      label:"",
      position: nextPosition,
      yield: 1,
      uom: "count"
    });

    await node.save();

    return node;
  },

  async destroyNode(node) {
    const children = await node.get("children");
    const parents = await node.get("parents");

    children
      .forEach(async edge => {
        const b = await edge.get("b");
        await edge.destroyRecord();
        await b.save();
      });

    parents
      .forEach(async edge => {
        const a = await edge.get("a");
        await edge.destroyRecord();
        await a.save();
      });

    await node.destroyRecord();
  }
});
