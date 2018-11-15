
function mockAlgoliaSearch() {
  window.algoliasearch = function() {
    return {
      initIndex(){
        return {
          search(){
            return { hits: []};
          }
        }
      }
    }
  }
}

export {
  mockAlgoliaSearch
}
