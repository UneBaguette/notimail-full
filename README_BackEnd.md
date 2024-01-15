Projet de Développement Back-end - Documentation pour les Développeurs Front-end
Bienvenue dans la documentation du projet de développement back-end de l'application web. Cette documentation est spécialement conçue pour les développeurs front-end qui souhaitent intégrer et comprendre le fonctionnement du back-end.

## Prérequis
Avant de commencer à travailler avec le projet, assurez-vous d'avoir les outils suivants installés sur votre machine :

Node.js et npm: Téléchargez et installez Node.js depuis https://nodejs.org/.

TypeScript: Installez TypeScript en utilisant la commande suivante : npm install -g typescript

Laragon (Base de données MySQL): Laragon est le logiciel recommandé pour gérer la base de données MySQL. Téléchargez-le depuis https://laragon.org/download/ et installez-le sur votre machine.

Visual Studio Code: Il est recommandé d'utiliser Visual Studio Code comme éditeur de code. Téléchargez-le depuis https://code.visualstudio.com/.

## Installation des Dépendances
Après avoir cloné le projet, exécutez la commande suivante dans le terminal pour installer toutes les dépendances nécessaires : npm install

- express: Un framework web pour Node.js qui facilite la création d'API.
- typeorm: Un ORM (Object-Relational Mapping) pour TypeScript et JavaScript, qui facilite       l'interaction avec les bases de données relationnelles.
- jsonwebtoken: Une bibliothèque pour la création et la vérification de JSON Web Tokens (JWT) utilisés dans l'authentification.
- bcrypt: Une bibliothèque pour le hachage sécurisé des mots de passe.
- nodemailer: Une bibliothèque pour l'envoi d'e-mails depuis Node.js.
- reflect-metadata: Une bibliothèque pour les annotations et la réflexion en TypeScript.
- axios: Une bibliothèque pour effectuer et gérer des requêtes HTTP dans Node.js.
- ts-node: Un outil qui permet d'exécuter des fichiers TypeScript directement sans nécessiter de conversion en JavaScript.
- typescript: Le langage de programmation qui permet d'écrire du code TypeScript.
- @types/express: Les types TypeScript pour Express.
- @types/jsonwebtoken: Les types TypeScript pour jsonwebtoken.
- @types/bcrypt: Les types TypeScript pour bcrypt.
- @types/axios: Les types TypeScript pour axios.
- @types/node: Les types TypeScript pour Node.js.

## Configuration de la Base de Données
Le projet utilise MySQL comme base de données. Assurez-vous que Laragon est installé et en cours d'exécution. Configurez les paramètres de base de données dans le fichier .env. Assurez-vous d'avoir créé une base de données correspondante sur Laragon.

## Exécution du Projet
Lancez le serveur en utilisant la commande suivante : npm start
Le serveur sera accessible à l'adresse http://localhost:PORT, où PORT est spécifié dans le fichier .env.

## Notes de Développement
Le projet utilise TypeScript et Node.js avec Express.
La base de données MySQL est gérée avec TypeORM.
Les sessions sont gérées via express-session.
La sécurité du code est assurée par l'utilisation d'un fichier .env.
N'hésitez pas à explorer le code source pour une compréhension approfondie de l'implémentation.

## Endpoints
Assurez-vous d'avoir télécharger l'extension REST Client sur votre Visual Studio Code, et retrouvez toutes les routes de l'application dans le dossier Requests afin de remplir votre BDD.

/auth/connexion: Endpoint POST pour l'authentification.
/auth/firm_names: Endpoint GET pour récupérer les noms des entreprises.
/auth/deconnexion: Endpoint GET pour la déconnexion.
/auth/connecteduser: Endpoint GET pour récupérer les informations de l'utilisateur connecté.
/user/users: Endpoint POST pour créer un utilisateur.
/user/users/:id: Endpoint GET pour récupérer un utilisateur spécifique.
/user/users: Endpoint GET pour récupérer tous les utilisateurs.
/user/users/:id: Endpoint PUT pour mettre à jour un utilisateur par ID.
/user/users/:id: Endpoint DELETE pour supprimer un utilisateur par ID.
/mail/received-mail/:userId: Endpoint POST pour indiquer la réception d'un courrier par l'admin.
/mail/picked-up-mail/:userId: Endpoint POST pour indiquer la récupération d'un courrier par l'utilisateur.

## Middleware
checkAuth: Middleware pour vérifier si l'utilisateur est connecté.
isAdmin: Middleware pour vérifier si l'utilisateur est administrateur.
validateUserId: Middleware pour valider l'ID de l'utilisateur dans les routes.