import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('authenticated', {path:'a'}, function() {
    this.route('products', function() {
      this.route('show', {path:':product_id'});
    });

    this.route('productions', function() {
      this.route('show', {path:':production_id'});
    });

    this.route('recipes', function() {
      this.route('show', {path:':recipe_id'});
    });

    this.route('ingredients', function() {
      this.route('show', {path:':ingredient_id'});
    });

    this.route('settings');
  });

  this.route('signup');
  this.route('login');
});

export default Router;
