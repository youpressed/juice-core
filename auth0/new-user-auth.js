// This should be added to Auth0 as a Pre User Registration Hook

module.exports = (user, context, cb) => {
  const admin = require("firebase-admin");
  const uuid = require('uuid');

  var serviceAccount = {
    projectId: "FB_PROJECT_ID",
    privateKey: "FB_PRIVATE_KEY",
    clientEmail: "SERVICE_ACCOUNT_EMAIL"
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "FB_DATABASE_URL"
  });

  const db = admin.database(),
        orgsRef = db.ref('orgs'),

        orgUUID = uuid(),

        usersRef = db.ref(`orgs/${orgUUID}/users`),
        userUUID = uuid();

  Promise.all([
    usersRef.set({
      [userUUID]: {
        role: 'admin'
      }
    })
  ])
  .then(() => {
    const response = {};

    response.user = {
      user_metadata: {
        org: orgUUID,
        fbid: userUUID
       }
    };
    cb(null, response);
  })
  .catch(e => {
    cb(e, response);
  });
};
