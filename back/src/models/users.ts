// models/users.ts

// Importe les décorateurs et les classes nécessaires de TypeORM
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

// Définit une entité User qui sera mappée sur une table dans la base de données
@Entity()
export class User {
    // Définit une colonne pour l'identifiant, qui est généré automatiquement
    @PrimaryGeneratedColumn()
    id!: number;

    // Définit une colonne pour le nom de l'entreprise avec une valeur par défaut vide
    @Column()
    firm_name: string = '';

    // Définit une colonne pour le prénom avec une valeur par défaut vide
    @Column()
    first_name: string = '';

    // Définit une colonne pour le nom de famille avec une valeur par défaut vide
    @Column()
    last_name: string = '';

    // Définit une colonne pour l'e-mail avec l'option unique (pas de doublons autorisés)
    @Column({ unique: true })
    email: string = '';

    // Définit une colonne pour le numéro de téléphone avec une valeur par défaut vide
    @Column()
    phone_number: string = '';

    // Définit une colonne pour le mot de passe avec une valeur par défaut vide
    @Column()
    password: string = '';

    // Définit une colonne pour la date du dernier courrier reçu avec la possibilité d'être nulle
    @Column({ type: 'timestamp', nullable: true })
    last_received_mail: Date | null = null;

    // Définit une colonne pour la date de la dernière récupération avec la possibilité d'être nulle
    @Column({ type: 'timestamp', nullable: true })
    last_picked_up: Date | null = null;

    // Définit une colonne pour indiquer si l'utilisateur a du courrier (par défaut, false)
    @Column({ default: false })
    has_mail: boolean = false;

    // Définit une colonne pour indiquer si l'utilisateur est administrateur (par défaut, false)
    @Column({ default: false })
    is_admin: boolean = false;

    // Avant l'insertion dans la base de données, cette fonction est appelée pour initialiser les dates
    @BeforeInsert()
    setDefaultDates() {
        this.last_received_mail = new Date();
        this.last_picked_up = new Date();
    }

    // Getter pour obtenir la date de réception du courrier au format local (français)
    get formattedLastReceivedMail(): string {
        return this.last_received_mail?.toLocaleString('fr-FR') || '';
    }

    // Getter pour obtenir la date de la dernière récupération au format local (français)
    get formattedLastPickedUp(): string {
        return this.last_picked_up?.toLocaleString('fr-FR') || '';
    }
}