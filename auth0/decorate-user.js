// This should be added to Auth0 as a rule

function (user, context, callback) {
    var admin = require("firebase-admin");

    var serviceAccount = {
      projectId: "FB_PROJECT_ID",
      privateKey: "FB_PRIVATE_KEY",
      clientEmail: "SERVICE_ACCOUNT_EMAIL"
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "FB_DATABASE_URL"
    });

    var fbid = user.user_metadata.fbid;

    admin.auth().createCustomToken(fbid)
      .then(function(customToken) {
        user.user_metadata = user.user_metadata || {};
        user.user_metadata.fbtoken = customToken;

        return callback(null, user, context);
      })
      .catch(function(error) {
        console.log("Error creating custom token:", error);

        return callback(error, user, context);
      });
}
