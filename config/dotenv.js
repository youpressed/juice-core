module.exports = function() {
  return {
    clientAllowedKeys: [
      'ALL_DOCS_ENDPOINT',
      'API_KEY',
      'AUTH0_CLIENT_ID',
      'AUTH0_DOMAIN',
      'AUTH_DOMAIN',
      'DATABASE_URL',
      'INTERCOM_APP_ID',
      'GOOGLE_TRACKING_ID',
      'STORAGE_BUCKET',
      'ALGOLIA_APPLICATION_ID',
      'ALGOLIA_SEARCH_API_ID'
    ],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: false,
  };
};
