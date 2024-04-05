import { Request, Response } from "express";
import UsersRepository from "../repositories/UsersRepository";
import { IUsers } from "../interfaces/IUsers";

const usersRepository = new UsersRepository();

export default class UsersController {
    async registerUser(req: Request, res: Response) {
        try {
            const user : IUsers = req.body;
            await usersRepository.register(user);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server error');
        }
    }

    async signIn(req: Request, res: Response) {
        try {
            const user : IUsers = req.body;
            await usersRepository.signIn(user);
            return res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error(error);
            return res.status(500).json('Internal Server error');
        }
    }
}

