import supertest from "supertest";
import { User } from "./src/models/users";
import bcrypt from "bcrypt";
import app from "./src/app";

export let users: User[];

export const close = async (users: User[]): Promise<void> => {
    try {
        await User.remove(users);

        const connection = User.getRepository().manager.connection;
        await connection.destroy();
    } 
    catch (error) {
        console.error('Erreur lors de l\'initialisation des tests. :', error);
        throw new Error('Erreur lors de l\'initialisation des tests.');
    }
}

export const getTokenTest = async (firm_name: string, password: string): Promise<string> => {
    try {
        const response = await supertest(app)
            .post('/auth/connexion')
            .send({
            firm_name,
            password,
            });

        
        return response.body.token;

    } catch (error) {
        console.error('Erreur lors de l\'obtention du token :', error);
        throw new Error('Erreur lors de l\'obtention du token.');
    }
}

beforeAll(async () => {
    users = User.create([
        {
            firm_name: "test1",
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            phone_number: "1234567890",
            has_mail: true,
            is_admin: false,
            password: await bcrypt.hash(":john:", 10),
        },
        {
            firm_name: "test2",
            first_name: "Jane",
            last_name: "Doe",
            email: "jane.doe@example.com",
            phone_number: "9876543210",
            has_mail: true,
            is_admin: true,
            password: await bcrypt.hash(":jane:", 10),
        },
        {
            firm_name: "test3",
            first_name: "Johnny",
            last_name: "Shoe",
            email: "johnny.shoe@example.com",
            phone_number: "5136724848",
            has_mail: true,
            is_admin: false,
            password: await bcrypt.hash(":johnny:", 10),
        }
    ]);
    await User.insert(users);
});

afterAll(async () => await close(users));