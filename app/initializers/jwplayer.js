import config from 'juice-core/config/environment';

export function initialize() {
  try {
    jwplayer.key = config.jwplayer.key;
  } catch (e){
    // continue regardless of error
  }
}

export default {
  initialize
};
