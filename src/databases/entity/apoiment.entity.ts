import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Apoiment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'time', default: null })
    time: Date;

    @ManyToOne(() => User, (user) => user.apoiment)
    @JoinColumn({ name: "userId" })
    user: User

    @Column({ default: false })
    status: boolean;
}