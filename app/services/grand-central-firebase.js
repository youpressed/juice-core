import Service, { inject as service } from "@ember/service";
import config from "juice-core/config/environment";
import firebase from "firebase";
import { isEmpty } from "@ember/utils";
import _ from "lodash";

export default Service.extend({
  store: service(),

  init() {
    this._super(...arguments);

    let fbApp = firebase.initializeApp(
      {
        databaseURL: config.grandCentralFirebase.dbUrl
      },
      "grandCentral"
    );
    let ref = fbApp
      .database()
      .ref()
      .child(`orgs/${config.grandCentralFirebase.orgId}`);

    this.set("fbRef", ref);
  },

  async addChildNode(parentNode, childId) {
    let childNode = await this.get("_cloneChildNode").call(this, childId);
    if (isEmpty(childNode)) return;

    this.get("_creatEdge").call(
      this,
      0,
      childNode.get("uom"),
      parentNode,
      childNode
    );
  },

  async _cloneChildNode(childId) {
    let childNode = this.get("store").peekRecord("node", childId);
    if (isEmpty(childNode)) {
      let childFbNode = await this.get("_fetchNode").call(this, childId);
      if (isEmpty(childFbNode)) return;

      let cleanChild = _.assign(childFbNode, { id: childId, isActive: true });
      cleanChild = _.omit(childFbNode, ["parents", "children"]);
      childNode = this.get("store").createRecord("node", cleanChild);
      await childNode.save();

      if (!isEmpty(childFbNode.children)) {
        _.keys(childFbNode.children).forEach(edgeId => {
          this.get("_cloneEdge").call(this, childNode, edgeId);
        }, this);
      }
    }

    return childNode;
  },

  async _creatEdge(qty, uom, parentNode, childNode, edgeId) {
    let edge = this.get("store").createRecord("edge", {
      id: edgeId,
      a: parentNode,
      b: childNode,
      q: qty,
      uom
    });
    await edge.save();

    parentNode.save();
    childNode.save();
  },

  async _cloneEdge(parentNode, edgeId) {
    let edge = this.get("store").peekRecord("edge", edgeId);
    if (!isEmpty(edge)) return;

    let fbEdge = await this.get("_fetchEdge").call(this, edgeId);
    if (isEmpty(fbEdge)) return;

    let childNode = await this.get("_cloneChildNode").call(this, fbEdge.b);
    if (isEmpty(childNode)) return;

    this.get("_creatEdge").call(
      this,
      fbEdge.q,
      fbEdge.uom,
      parentNode,
      childNode,
      edgeId
    );
  },

  async _fetchNode(fbId) {
    return await this.get("_fetch")("nodes", fbId);
  },
  async _fetchEdge(fbId) {
    return await this.get("_fetch")("edges", fbId);
  },
  async _fetch(nodeName, fbId) {
    let snapshot = await this.get("fbRef")
      .child(`${nodeName}/${fbId}`)
      .once("value");
    return snapshot.val();
  }
});
