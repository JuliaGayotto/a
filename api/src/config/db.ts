import * as admin from 'firebase-admin';

const serviceAccount = require('./notas-api-7f344-firebase-adminsdk-rxtag-54e5e6d12a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export default db;
