# juice-core


## Installation

* `git clone git@github.com:youpressed/juice-core.git` this repository
* `cd juice-core`
* `npm install -g ember-cli`
* `brew install yarn`
* `yarn install`

## Setting up dev environment

* `touch .env`
1. Setup your new .env with the following vars
  1. ALL_DOCS_ENDPOINT=AWS Lambda PDF endpoint
  1. AUTH0_CLIENT_ID=AUTH0_CLIENT_ID
  1. AUTH0_DOMAIN=AUTH0_DOMAIN
  1. API_KEY=Firebase API Key
  1. AUTH_DOMAIN=FIREBASE_AUTH_DOMAIN
  1. DATABASE_URL=FIREBASE_DATABASE_URL
  1. STORAGE_BUCKET=FIREBASE_STORAGE_BUCKET_URL

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)
