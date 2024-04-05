import { Router, Request, Response } from "express";
import userRouter from "./UsersRoutes";
import notesRouter from "./NotesRoutes";


const routes = Router();

routes.use("/user", userRouter)
routes.use('/notes', notesRouter)
routes.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;