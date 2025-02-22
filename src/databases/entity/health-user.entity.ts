import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class HealthUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    height: number;

    @Column()
    weight: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}