import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DeviceSession } from "./device-session.entity";


@Entity()
export class Apoiment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'time', default: null })
    time: Date;

    @ManyToOne(() => DeviceSession, (deviceSession) => deviceSession.apoiment)
    @JoinColumn({ name: "deviceSession" })
    deviceSession: DeviceSession

    @Column({ default: false })
    isSendNotification: boolean;



}