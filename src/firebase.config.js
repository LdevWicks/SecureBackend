const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/project/pwa5-89c3b/database/pwa5-89c3b/data/~2F'
});

module.exports = admin;
