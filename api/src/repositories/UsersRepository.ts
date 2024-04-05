import { IUsers } from "../interfaces/IUsers";
import  db  from "../config/db";
import * as bcrypt from 'bcrypt';

const usersCollection = db.collection('users');

export default class UsersRepository {
    async register(user: IUsers) {
        try {
            const userExists = await usersCollection.where('email', '==', user.email).get();
            if (!userExists.empty) {
                throw new Error('Email already exists');
            }
    
            // Hash da senha
            const hashedPassword = await bcrypt.hash(user.password, 10);
    
            // Salvar usuário no Firestore
            await usersCollection.add({ 
                name: user.name, 
                email: user.email, 
                password: hashedPassword 
            });
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
    async signIn(user: IUsers) {
        try {
            const querySnapshot = await usersCollection.where('email', '==', user.email).limit(1).get();
            if (querySnapshot.empty) {
                throw new Error('User not found');
            }

            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            // Verificar senha
            const passwordMatch = await bcrypt.compare(user.password, userData.password);
            if (!passwordMatch) {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    }
}
