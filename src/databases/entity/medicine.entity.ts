import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Medicine {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    volume: number;

    @Column()
    notes: string

}