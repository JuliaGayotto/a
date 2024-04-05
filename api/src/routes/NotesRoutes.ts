import { Router } from 'express';
import NotesController from '../controllers/NotesController';

const notesRouter = Router();

const notesController = new NotesController();

notesRouter.post('/createNote', notesController.createNote);
notesRouter.get('/selectNotes/:userId', notesController.selectNotesByUser);
notesRouter.get('/selectNote/:userId/:notesId', notesController.selectNoteById);
notesRouter.put('/updateNote/:userId/:notesId', notesController.updateNoteById);
notesRouter.post('/deleteNote', notesController.deleteNoteById);

export default notesRouter;
