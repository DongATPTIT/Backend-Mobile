import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { group } from "console";
import { Prescuption } from "./prescuption.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { Exclude } from "class-transformer";


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

    // @OneToMany(() => Prescuption, (prescuption) => prescuption.user)
    // prescuption: Prescuption[];

    @Exclude()
    @Column({ default: null })
    refreshToken: string;
}