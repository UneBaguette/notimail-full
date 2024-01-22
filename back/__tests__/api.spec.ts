import TestAgent from "supertest/lib/agent";
import Test from "supertest/lib/test";
import app from "../src/app";
import supertest from "supertest";
import { User } from "../src/models/users";
import bcrypt from "bcrypt";

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

export const getAdminTokenTest = async (): Promise<string> => {
    try {

      const admin = await User.findOne({ where: { firm_name: "admintest" } });

      if (admin && !admin.is_admin) {
        await User.delete({firm_name: "admintest"});
      }

      if (!admin) {
        const admin = User.create([{
          firm_name: "admintest",
          first_name: "admin",
          last_name: "test",
          email: "test@test.com",
          password: await bcrypt.hash("admin", 10),
          phone_number: "098765453",
          last_picked_up: new Date(),
          last_received_mail: new Date(),
          is_admin: true
        }]);
        await User.insert(admin);
      }

      const response = await supertest(app)
        .post('/auth/connexion')
        .send({
            firm_name: 'admintest',
            password: 'admin',
        });
  
      const { token } = response.body;
  
      return token;
    } catch (error) {
      console.error('Erreur lors de l\'obtention du token :', error);
      throw new Error('Erreur lors de l\'obtention du token.');
    }
};

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