import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
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
});

export default Router;
