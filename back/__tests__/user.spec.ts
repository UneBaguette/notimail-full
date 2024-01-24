import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import Test from "supertest/lib/test";
import app from "../src/app";
import { User } from "../src/models/users";
import { compareSync } from "bcrypt";
import { close, getTokenTest, users } from "../jest.setup";

describe("ROUTE /user", () => {

    let userData: Partial<User> = {
        firm_name: "test",
        first_name: "test",
        last_name: "testname",
        email: "test.test@test.com",
        phone_number: "1234567890",
        has_mail: true,
        is_admin: false,
        password: ":test:",
    }

    let adminToken: string;
    
    let userToken: string;

    let server: TestAgent<Test>;

    beforeAll(async () => {
        server = supertest(app);
        adminToken = await getTokenTest(users[1].firm_name, ":jane:");
        userToken = await getTokenTest(users[0].firm_name, ":john:");
    });

    afterAll(async () => await close(users));

    it("should return all users", (done) => {
        server
            .get("/user/users")
            .set('Cookie', [`token=${adminToken}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Array<User>);
                done();
            });
    });

    it('should create a new user', (done) => {
        server
            .post('/user/users')
            .set('Cookie', [`token=${adminToken}`])
            .send(userData)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                userData.id = res.body.id;
                expect(compareSync(userData.password!, res.body.password)).toBeTruthy();
                done();
            });
    });

    it("should get user by ID", (done) => {
        server
            .get(`/user/users/${userData.id}`)
            .set('Cookie', [`token=${adminToken}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                console.info(res.body);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.id).toBe(userData.id);
                done();
            });
    });

    it("should not proceed if user is not admin when trying to fetch users", (done) => {
        server
            .get("/user/users")
            .set("Cookie", [`token=${userToken}`])
            .expect(403)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ error: 'Access forbidden. User is not an admin' });
                done();
            });
    });

    it("should not find user by ID", (done) => {
        server
            .get(`/user/users/-999`)
            .set('Cookie', [`token=${adminToken}`])
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ error: 'Utilisateur non trouvé' });
                done();
            });
    });

    it("should fail to validate the user ID", (done) => {
        server
            .get("/user/users/!!!")
            .set("Cookie", [`token=${adminToken}`])
            .expect(400)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).toMatchObject({ error: 'ID utilisateur invalide' });
                done();
            });
    });

    it('should fail to create a new user without admin privileges', (done) => {
        server
            .post('/user/users')
            .set('Cookie', [`token=token`])
            .send(users[0])
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ error: 'Invalid token' });
                done();
            });
    });

    it('should fail to create a new user with invalid data', (done) => {
        server
            .post('/user/users')
            .set('Cookie', [`token=${adminToken}`])
            .send({ test: 200000000 })
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ error: 'Erreur serveur lors de la création de l\'utilisateur' });
                done();
            });
    });

    it('should fail on create a new user with existing entries', (done) => {
        server
            .post('/user/users')
            .set('Cookie', [`token=${adminToken}`])
            .send({
                firm_name: "test3",
                first_name: "Johnny",
                last_name: "Shoe",
                email: "johnny.shoe@example.com",
                phone_number: "5136724848",
                has_mail: true,
                is_admin: false,
                password: ":test:",
            })
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ error: 'Erreur serveur lors de la création de l\'utilisateur' });
                done();
            });
    });

    it("should update user by ID", (done) => {
        server
            .put(`/user/users/${users[2].id}`)
            .set("Cookie", [`token=${adminToken}`])
            .send({ first_name: "TESTNAME"})
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.first_name).toBe("TESTNAME")
                done();
            });
    });

    it("should not find user to delete", (done) => {
        server
            .delete('/user/users/-999')
            .set("Cookie", [`token=${adminToken}`])
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ error: 'Utilisateur non trouvé' });
                done();
            });
    });

    it("should delete a user by ID", (done) => {
        server
            .delete(`/user/users/${userData.id}`)
            .set('Cookie', [`token=${adminToken}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ message: 'Utilisateur supprimé' });
                done();
            });
    });

});