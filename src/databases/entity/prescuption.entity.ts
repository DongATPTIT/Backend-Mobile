import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Medicine } from "./medicine.entity";

@Entity()
export class Prescuption {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.prescuption)
    user: User;

    // @ManyToMany(())
    // medicine: Medicine[];
}