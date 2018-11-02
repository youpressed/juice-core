import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import _ from 'lodash';

import firebase from 'firebase';
var fbApp = firebase.initializeApp({
  "databaseURL": "https://youpressed-grand-central.firebaseio.com"
}, 'grandCentral');
var ref = fbApp.database().ref();

export default Controller.extend({
  store: service(),

  async cloneGrandCentralEdge(currentNode, edgeId, context) {
    let edge = context.get('store').peekRecord('edge', edgeId);
    if (!isEmpty(edge)) return;

    let edgeSnapshot = await ref.child(`orgs/0691f901-38e7-47f3-be15-998e52fee753/edges/${edgeId}`).once('value');
    let fbEdge = edgeSnapshot.val();
    if (isEmpty(fbEdge)) return;

    let childId = fbEdge.b;
    let childNode = context.get('store').peekRecord('node', childId);
    if (isEmpty(childNode)){
      var childNodeSnapshot = await ref.child(`orgs/0691f901-38e7-47f3-be15-998e52fee753/nodes/${childId}`).once('value');
      let childFbNode = childNodeSnapshot.val();
      if (isEmpty(childFbNode)) return;

      let cleanChild = _.assign(childFbNode, { id: childId, isActive: true });
      cleanChild = _.omit(childFbNode, ['parents', 'children']);
      childNode = context.get('store').createRecord('node', cleanChild);
      await childNode.save();

      if (!isEmpty(childFbNode.children)) {
        _.keys(childFbNode.children).forEach(childEdgeId => {
          context.get('cloneGrandCentralEdge')(childNode, childEdgeId, context)
        }, context);
      }
    }

    edge = context.get('store').createRecord('edge', _.assign(fbEdge, {
      id: edgeId,
      a: currentNode,
      b: childNode
    }));
    await edge.save();

    currentNode.save();
    childNode.save();
  },

  actions: {
    navigateTo(path) {
      this.transitionToRoute(path);
    },

    handleUpdate(model, key, val) {
      model.set(key, val);
      model.save();
    },

    async deleteEdge(edge) {
      const a = await edge.get('a');
      const b = await edge.get('b');
      await edge.destroyRecord();

      a.save();
      b.save();
    },

    async addNode(a, b) {
      const edge = this.get('store').createRecord('edge', {a, b, q: 0, uom:b.get('uom')});
      await edge.save();

      a.save();
      b.save();
    },

    async cloneGrandCentralNode(currentNode, childId) {
      let childNode = this.get('store').peekRecord('node', childId);
      if (isEmpty(childNode)) {
        let snapshot = await ref.child(`orgs/0691f901-38e7-47f3-be15-998e52fee753/nodes/${childId}`).once('value');
        let childFbNode = snapshot.val();
        if (isEmpty(childFbNode)) return;

        let cleanChild = _.assign(childFbNode, { id: childId, isActive: true });
        cleanChild = _.omit(childFbNode, ['parents', 'children']);
        childNode = this.get('store').createRecord('node', cleanChild);
        await childNode.save();

        if (!isEmpty(childFbNode.children)) {
          _.keys(childFbNode.children).forEach(childEdgeId => {
            this.get('cloneGrandCentralEdge')(childNode, childEdgeId, this)
          }, this);
        }
      }

      let edge = this.get('store').createRecord('edge',
        { a: currentNode, b: childNode, q: 0, uom: childNode.get('uom') }
      );
      await edge.save();

      currentNode.save();
      childNode.save();
    },

    async createAndAddNode(a, data) {
      const { type, label, description, uom } = data;
      const b = this.get('store').createRecord('node', { type, label, description, uom });
      await b.save();

      const edge = this.get('store').createRecord('edge', { a, b, q: 0, uom });
      await edge.save();

      a.save();
      b.save();
    },

    async destroyNode(node) {
      const children = await node.get("children");
      const parents = await node.get("parents");

      children
        .forEach(async edge => {
          const b = await edge.get("b");
          edge.destroyRecord();
          b.save();
        });

      parents
        .forEach(async edge => {
          const a = await edge.get("a");
          edge.destroyRecord();
          a.save();
        });

      node.destroyRecord();

      this.transitionToRoute('products');
    }
  }
});
