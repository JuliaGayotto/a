import { Request, Response } from "express";
import admin from 'firebase-admin';
import INotes from "../interfaces/INotes";
import NotesRepository from "../repositories/NotesRepository";

const notesRepository = new NotesRepository();

class NotesController {
  async selectNotesByUser(Request: Request, Response: Response): Promise<void> {
    try {
      const userId = Request.body.userId;
      const userNotes: INotes[] = await notesRepository.selectAllNotesByUser(userId);
      Response.status(200).json(userNotes);
    } catch (error) {
      Response.status(500).send({ error: 'Internal Server error', message: error.message });
    }
  }

  async selectNoteById(Request: Request, Response: Response): Promise<void> {
    try {
      const userId = Request.params.userId; 
      const notesId = Request.params.notesId; 
      const note: INotes = await notesRepository.findNoteById(userId, notesId);
      Response.status(200).json(note);
    } catch (error) {
      Response.status(500).send({ error: 'Internal Server error', message: error.message });
    }
  }

  async createNote(Request: Request, Response: Response): Promise<void> {
    try {
      const notes: INotes = Request.body;
      await notesRepository.create(notes);
      Response.status(201).send('Nota cadastrada com sucesso!');
    } catch (error) {
      Response.status(500).send({ error: 'Internal Server error', message: error.message });
    }
  }

  async updateNoteById(Request: Request, Response: Response): Promise<void> {
    try {
      const { userId, notesId } = Request.params;
      const { text, datetime } = Request.body;
      const timestamp = admin.firestore.Timestamp.fromDate(new Date(datetime));

      await notesRepository.updateNoteById(userId, notesId, text, timestamp);
      Response.status(200).send('Nota atualizada com sucesso!');
    } catch (error) {
      Response.status(500).send({ error: 'Internal Server error', message: error.message });
    }
  }

  async deleteNoteById(Request: Request, Response: Response): Promise<void> {
    try {
      const userId = Request.params.userId;
      const notesId = Request.params.notesId;
      await notesRepository.deleteNoteById(userId, notesId);
      Response.status(204).send('Nota deletada com sucesso!');
    } catch (error) {
      Response.status(500).send({ error: 'Internal Server error', message: error.message });
    }
  }

}

export default NotesController;
