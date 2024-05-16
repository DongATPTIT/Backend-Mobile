import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { Exclude } from "class-transformer";
import { Apoiment } from "./apoiment.entity";


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

    @Column({ default: null })
    image: string;

    @ManyToOne(() => Group, (group) => group.user)
    group: Group;

    @OneToMany(() => Apoiment, (photo) => photo.user)
    apoiment: Apoiment[]

    @Exclude()
    @Column({ default: null })
    refreshToken: string;

    @Exclude()
    @Column({ default: null })
    deviceToken: string;
}