import config from 'juice-core/config/environment';

export function initialize() {
  jwplayer.key = config.jwplayer.key;
}

export default {
  initialize
};
