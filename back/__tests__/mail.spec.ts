import TestAgent from "supertest/lib/agent";
import { User } from "../src/models/users";
import bcrypt from "bcrypt";
import Test from "supertest/lib/test";
import supertest from "supertest";
import app from "../src/app";
import { close } from "./api.spec";

describe("ROUTE /mail", () => {

    let server: TestAgent<Test>;

    let users: User[];

    beforeAll(async () => {
        server = supertest(app);
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

    afterAll(async() => await close(users));
    
    it("should pickup the mail from user", (done) => {
        server
            .post(`/mail/picked-up-mail/${users[0].id}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ message: 'Courrier récupéré par le client avec succès' });
                done();
            });
    });

    it("should fail on pickup mail", (done) => {
        server
            .post("/mail/picked-up-mail/-999")
            .expect(500)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toMatchObject({ error: 'Une erreur est survenue lors de la récupération du courrier' });
                done();
            });
    })
});