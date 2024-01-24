import Test from "supertest/lib/test";
import { close, users } from "../jest.setup";
import TestAgent from "supertest/lib/agent";
import supertest from "supertest";
import app from "../src/app";

describe("ROUTE /auth", () => {

    let token: string;

    let server: TestAgent<Test>;

    beforeAll(async () => {
        server = supertest(app);
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