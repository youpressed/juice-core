import AuthenticatedRoute from 'juice-core/routes/authenticated-route';

export default AuthenticatedRoute.extend({
  model() {
    return this.store.query('node', {
      orderBy: "type",
      equalTo: "ingredient"
    });
  }
});
