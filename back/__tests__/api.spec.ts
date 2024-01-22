import TestAgent from "supertest/lib/agent";
import Test from "supertest/lib/test";
import app from "../src/app";
import supertest from "supertest";
import { User } from "../src/models/users";

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