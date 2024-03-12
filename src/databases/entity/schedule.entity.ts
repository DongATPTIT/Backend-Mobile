import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { TakeMedicine } from "./take_medicine.entity";


@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => TakeMedicine, (take_medicine) => take_medicine.schedule)
    take_medicine: TakeMedicine[];
}