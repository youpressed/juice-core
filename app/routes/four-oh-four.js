import Route from '@ember/routing/route';

export default Route.extend({
  afterModel(transition) {
    switch (transition.path) {
      case "productions":
      case "products":
      case "recipes":
      case "ingredients":
        this.transitionTo(`authenticated.${transition.path}`)
        break;
    }
  }
});
