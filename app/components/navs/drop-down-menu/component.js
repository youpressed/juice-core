
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],
  showMenu: false,

  init() {
    this._super(...arguments);
    this.mouseUps = Rx.Observable.fromEvent(window, 'mouseup');
    this.toggles = new Rx.Subject();

    this.setupStreams();
  },

  willDestroyElement() {
    this.togglesSub.dispose();
    this.mouseUpsSub.dispose();
  },

  setupStreams() {
    this.togglesSub = this.toggles
      .subscribe(nextState => this.set('showMenu', nextState));

    this.mouseUpsSub = this.mouseUps
      .filter(({target}) => target !== this.$(".trigger")[0])
      .filter(() => this.get('showMenu'))
      .subscribe(() => this.set('showMenu', false));
  },

  actions: {
    toggle() {
      this.toggles.onNext(!this.get('showMenu'));
    }
  }
});
