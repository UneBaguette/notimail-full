// models/users.ts

import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
export class User {
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
    has_mail: boolean = false;

    @Column({ default: false })
    is_admin: boolean = false;

    // Avant l'insertion, initialise les dates à la date d'inscription
    @BeforeInsert()
    setDefaultDates() {
        this.last_received_mail = new Date();
        this.last_picked_up = new Date();
    }
}