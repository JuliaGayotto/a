import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/register', usersController.registerUser);
usersRouter.get('/signin', usersController.signIn);

export default usersRouter;
