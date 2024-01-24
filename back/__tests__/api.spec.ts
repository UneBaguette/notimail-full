import TestAgent from "supertest/lib/agent";
import Test from "supertest/lib/test";
import app from "../src/app";
import supertest from "supertest";
import { User } from "../src/models/users";

describe("API", () => {

    let server: TestAgent<Test>;

    beforeAll(async () => {
        server = supertest(app);
    });

    it("should get API endpoint", (done) => {
        server
        .get("/")
        .expect(200)
        .end((err, res) => {
            if (err) return done();
            expect(res.body).toMatchObject({ message: "Bienvenue sur la page d'accueil!" });
            done();
        });
    });
    
});