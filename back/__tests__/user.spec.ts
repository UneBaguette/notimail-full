import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import Test from "supertest/lib/test";
import app from "../src/app";
import connectDB from "../src/datasource";

describe("ROUTE /user", () => {

    let server: TestAgent<Test>;

    beforeAll(async () => {
        server = supertest(app);
        try {
            await connectDB.initialize();
        }
        catch (err) {
            console.error("Failed to initialize DB with error: " + err);
        }
    });

    // Template
    it("should work", (done) => {
        expect(1 + 2).toBe(3);
        done();
    });

    afterAll(async () => await connectDB.destroy());
});