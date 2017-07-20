import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import _ from 'lodash';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    controller.set('nodes', this.store.peekAll('node'));


    // console.log(this.serializeForEmberData());

    this.serializeForEmberData().then(data => console.log(JSON.stringify(data)));


  },





  async serializeForEmberData() {
    const modelNames = ['node', 'edge'];

    const nodes = await this.store.findAll('node');
    const edges = await this.store.findAll('edge');

    // const merged = _.merge(nodes.toArray(), edges.toArray());

    const nodesSerialized = nodes
      .map(record => {
        const serialized = record.serialize({ includeId: true});
        serialized['type'] = 'nodes';
        return serialized;
      });

    const edgesSerialized = edges
      .map(record => {
        const serialized = record.serialize({ includeId: true});
        serialized['type'] = 'edges';
        return serialized;
      });

    return {
      data: _.merge(nodesSerialized, edgesSerialized)
    }
    // const nodes = await this.store.peekAll('node');
    // const products = nodes.filter(node => node.get('type') === 'product');
    // const data = products.map(product => product.serialize({includeId: true}));



    // const fulfillments = await rv.get("fulfillments");
    // const relationshipPromises = fulfillments.map(f => {
    //   return [
    //     f.get("order"),
    //     f.get("order.orderItems"),
    //     f.get("creditNote"),
    //     f.get("creditNote.creditNoteItems"),
    //     f.get("stock"),
    //     f.get("stock.stockLevels"),
    //     f.get("pod")
    //   ]
    //   .filter(model => Ember.isPresent(model));
    // });
    //
    // const relationships = await Promise.all(relationshipPromises);
    //
    // const included = _.chain(relationships)
    //   .flattenDeep()
    //   .map(r => r.content)
    //   .filter(r => Ember.isPresent(r))
    //   .map(r => _.isFunction(r.toArray) ? r.toArray() : r)
    //   .flattenDeep()
    //   .map(r => r.serialize({includeId: true}).data)
    //   .value();
    //
    // return {
    //   data,
    //   included
    // };

    // return {
    //   data
    // };
  },



  model(params) {
    return Ember.RSVP.Promise.all([
      this.store.query('node', {
        orderBy: "type",
        equalTo: "production"
      }),
      this.store.query('node', {
        orderBy: "type",
        equalTo: "product"
      })
    ]);
  },

  actions: {
    showNode(node) {
      this.transitionTo('productions.show', node.get('id'));
    },

    async createNode() {
      const products = this.store.peekAll('node')
        .filter(node => node.get('isProduct'));

      const date = moment().toDate();
      const node = this.store.createRecord("node", {
        type:"production",
        uom:"count",
        date
      });

      node.save();

      await Ember.RSVP.all(products
        .map(b => {
          const edge = this.store.createRecord('edge', {a:node, b, q: 0});
          return edge.save().then(() => Ember.RSVP.all([node.save(), b.save()]))
        }));

      this.transitionTo('productions.show', node.get('id'));
    }
  }
});
