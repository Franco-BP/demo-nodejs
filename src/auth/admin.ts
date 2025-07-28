import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
});

export default admin;