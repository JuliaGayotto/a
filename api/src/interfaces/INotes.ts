import admin from 'firebase-admin';

interface INotes {
  notesId: string;
  userId: string;
  text: string;
  datetime: admin.firestore.Timestamp;
}

export default INotes;
