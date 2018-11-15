import Service, { inject as service }  from '@ember/service';
import moment from 'moment';
import { all } from 'rsvp';

export default Service.extend({
  store: service(),

  async createProduction() {
    const products = this.get('store').peekAll('node')
      .filter(node => node.get('isProduct'))
      .filter(node => node.get('isActive'));

    const date = moment().toDate();
    const node = this.get('store').createRecord("node", {
      type:"production",
      uom:"count",
      date
    });

    await node.save();

    await all(products
      .map(b => {
        const edge = this.get('store').createRecord('edge', {a:node, b, q: 0});
        return edge.save().then(() => all([node.save(), b.save()]));
      }));

    return node;
  },

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
  },

  async handleUpdate(model, key, val) {
    model.set(key, val);
    await model.save();
  }
});
