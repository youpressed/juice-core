import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  nodeService: service(),

  actions: {
    async createProduct(){
      let product = await this.get('nodeService').createProduct();
      this.transitionToRoute('authenticated.products.show', product.get('id'));
    }
  }
});
