import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { isEmpty } from '@ember/utils';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.query('node', {
      orderBy: "type",
      equalTo: "product"
    })
  },

  afterModel(model) {
    if(!isEmpty(model)) {
      this.transitionTo("authenticated.productions.index");
    }
  }
});
