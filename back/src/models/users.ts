// models/users.ts

import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    constructor(params?: Partial<User>) {
        super()
        Object.assign(this, params)
    }

    @PrimaryGeneratedColumn()
    id!: number; 

    @Column()
    firm_name: string = '';

    @Column()
    first_name: string = '';

    @Column()
    last_name: string = '';

    @Column({ unique: true })
    email: string = '';

    @Column()
    phone_number: string = '';

    @Column()
    password: string = '';

    @Column({ type: 'timestamp', nullable: true })
    last_received_mail: Date | null = null;

    @Column({ type: 'timestamp', nullable: true })
    last_picked_up: Date | null = null;

    @Column({ default: false })
    has_mail!: boolean;

    @Column({ default: false })
    is_admin!: boolean;

    // Avant l'insertion, initialise les dates à la date d'inscription
    @BeforeInsert()
    setDefaultDates() {
        this.last_received_mail = this.last_picked_up = new Date();
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