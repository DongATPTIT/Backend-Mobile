import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time: number;

    @Column()
    date: Date;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}