import Test from "supertest/lib/test";
import { User } from "../src/models/users";
import { close } from "./api.spec";
import TestAgent from "supertest/lib/agent";
import supertest from "supertest";
import app from "../src/app";
import bcrypt from "bcrypt";

describe("ROUTE /auth", () => {

    let token: string;

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

    afterAll(async () => await close(users));

    beforeEach(async () => {
        const response = await server
            .post("/auth/connexion")
            .send({
                firm_name: "test3",
                password: ":johnny:"
            })
            .expect(200);

        token = response.body.token;
    });

    it("should connect a user", (done) => {
        server
            .post("/auth/connexion")
            .send({
                firm_name: "test3",
                password: ":johnny:"
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).toBe('Authentification réussie.');
                done();
            });
    });

    it("should not find a user to connect", (done) => {
        server
            .post("/auth/connexion")
            .send({
                firm_name: "@@++==$^!!!--;;!test!;;--!!!^$==++@@",
                password: "test"
            })
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ message: "L'utilisateur n'existe pas." });
                done();
            });
    });

    it("should fail on connect user with wrong password", (done) => {
        server
            .post("/auth/connexion")
            .send({
                firm_name: "test3",
                password: "test"
            })
            .expect(401)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toMatchObject({ message: 'Mot de passe incorrect.' });
                done();
            });
    });

    it("should return connected user", (done) => {
        server
            .get("/auth/connecteduser")
            .set('Cookie', [`token=${token}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.userConnected).toBeInstanceOf(Object);
                expect(res.body.userConnected).toHaveProperty("id");
                expect(res.body.userConnected).toHaveProperty("firm_name");
                done();
            });
    });

    it("should return only firm_name from users", (done) => {
        server
            .get("/auth/firm_names")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Array<String>);
                done();
            });
    });

    it("should fail to disconnect the user", (done) => {
        server
            .get("/auth/deconnexion")
            .set("Cookie", [`token=`])
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ message: 'Erreur lors de la vérification de l\'authentification.' });
                done();
            });
    });

    it("should disconnect the user", (done) => {
        server
            .get("/auth/deconnexion")
            .set("Cookie", [`token=${token}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).toBe('Déconnexion réussie.');
                done();
            });
    });
});