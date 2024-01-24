import TestAgent from "supertest/lib/agent";
import { User } from "../src/models/users";
import Test from "supertest/lib/test";
import supertest from "supertest";
import app from "../src/app";
import { close, users } from "../jest.setup";

describe("ROUTE /mail", () => {

    let server: TestAgent<Test>;

    beforeAll(async () => {
        server = supertest(app);
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