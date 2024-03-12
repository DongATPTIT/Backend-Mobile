import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Schedule } from "./schedule.entity";


@Entity()
export class TakeMedicine {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    how_long: number;

    @Column()
    food: string;

    @Column()
    duration: number;

    @Column()
    notes: string;

    @ManyToOne(() => Schedule, (schedule) => schedule.take_medicine)
    schedule: Schedule;
}
