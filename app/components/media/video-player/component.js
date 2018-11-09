import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { computed } from '@ember/object';

const BASE_URL = "https://content.jwplatform.com";

export default Component.extend({
  guid: computed(function() {
    return `video-container-${guidFor(this)}`;
  }),

  didInsertElement() {
    this._super(...arguments);
    if(jwplayer) {
      this.set('player', jwplayer(this.get('guid')));
    }
  },

  didRender() {
    this._super(...arguments);

    this.get('player').setup({
      image: `${BASE_URL}/thumbs/${this.get("image")}`,
      mediaid: this.get("mediaId"),
      file: `${BASE_URL}/videos/${this.get("file")}`
    });
  }
});
