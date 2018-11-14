import Service from '@ember/service';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),

  init() {
    this._super(...arguments);

    const nodes = this.get("store").peekAll("node");
    const edges = this.get("store").peekAll("edge");

    this.set('nodes', nodes);
    this.set('edges', edges);
  },

  hasDirtyNodes: computed("nodes.@each.{hasDirtyAttributes}", function() {
    return this.get("nodes").any(node => node.get("hasDirtyAttributes"));
  }),

  hasDirtyEdges: computed("edges.@each.{hasDirtyAttributes}", function() {
    return this.get("edges").any(edge => edge.get("hasDirtyAttributes"));
  }),

  isSaving: or("hasDirtyNodes", "hasDirtyEdges")
});
