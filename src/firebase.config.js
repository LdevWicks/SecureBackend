const admin = require('firebase-admin');
const path = require('path');

// Path to your Firebase Admin SDK JSON file
const serviceAccountPath = ('../firebaseAdmin.js.json');

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  databaseURL: 'https://pwa5-89c3b.firebaseio.com/' // Replace with your database URL
});

module.exports = admin;
