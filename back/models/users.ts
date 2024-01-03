// models/users.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

    @Column({ nullable: true })
    last_received_mail: Date | null = null;

    @Column({ nullable: true })
    last_picked_up: Date | null = null;

    @Column({ default: false })
    has_mail: boolean = false;

    @Column({ default: false })
    is_admin: boolean = false;
}