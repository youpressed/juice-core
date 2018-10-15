import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('products', function() {
    this.route('show', {path:':product_id'});
  });

  this.route('productions', function() {
    this.route('show', {path:'/edit/:production_id'});
    this.route('sheets', {path:'/sheets/:production_id'});
  });

  this.route('recipes', function() {
    this.route('show', {path:':recipe_id'});
  });

  this.route('ingredients', function() {
    this.route('show', {path:':ingredient_id'});
  });

  this.route('signup');
  this.route('login');
  this.route('settings');
});

export default Router;
