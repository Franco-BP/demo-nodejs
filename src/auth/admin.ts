import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(require('../config/API-PKey.json')),
});

export default admin;