import admin from 'firebase-admin';
import Note from '../interfaces/INotes';
import INotes from '../interfaces/INotes';

class NoteRepository {
  async selectAllNotesByUser(userId: string): Promise<INotes[]> {
    try {
      const userNotesSnapshot = await admin.firestore()
        .collection('users')
        .doc(userId)
        .collection('notes')
        .get();

      const userNotes: INotes[] = [];

      userNotesSnapshot.forEach((doc) => {
        const noteData = doc.data();
        const note: INotes = {
          notesId: doc.id,
          userId: userId,
          text: noteData.text,
          datetime: noteData.datetime
        };
        userNotes.push(note);
      });

      return userNotes;
    } catch (error) {
      console.error('Error selecting notes:', error);
      throw error;
    }
  }

  async findNoteById(userId: string, noteId: string): Promise<INotes | null> {
    try {
      const noteDoc = await admin.firestore()
        .collection('users')
        .doc(userId)
        .collection('notes')
        .doc(noteId)
        .get();

      if (!noteDoc.exists) {
        console.log('Note not found.');
        return null;
      }

      const noteData = noteDoc.data();
      const note: INotes = {
        userId: userId,
        notesId: noteId,
        text: noteData.text,
        datetime: noteData.datetime
      };

      return note;
    } catch (error) {
      console.error('Error selecting note:', error);
      throw error;
    }
  }
  
  async create(notes: INotes): Promise<void> {
    try {
      const userDocRef = admin.firestore().collection('users').doc(notes.userId);
      await userDocRef.collection('notes').add({
        text: notes.text,
        datetime: notes.datetime
      });
    } catch (error) {
      console.error('Error registering note:', error);
      throw error;
    }
  }

  async updateNoteById(userId: string, noteId: string, text: string, datetime: admin.firestore.Timestamp): Promise<void> {
    try {
      const noteRef = admin.firestore()
        .collection('users')
        .doc(userId)
        .collection('notes')
        .doc(noteId);
  
      await noteRef.update({ text: text, datetime: datetime });
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  async deleteNoteById(userId: string, noteId: string): Promise<void> {
    try {
      const noteRef = admin.firestore()
        .collection('users')
        .doc(userId)
        .collection('notes')
        .doc(noteId);

      await noteRef.delete();
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }

}

export default NoteRepository;
