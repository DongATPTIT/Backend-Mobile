import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { group } from "console";
import { Prescuption } from "./prescuption.entity";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    phone: number;

    @Column()
    image: string;

    @ManyToOne(() => Group, (group) => group.user)
    group: Group;

    @OneToMany(() => Prescuption, (prescuption) => prescuption.user)
    prescuption: Prescuption[];
}