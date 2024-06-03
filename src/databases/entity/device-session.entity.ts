import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Apoiment } from "./apoiment.entity";
import { ApiOAuth2 } from "@nestjs/swagger";

@Entity('device-session')
export class DeviceSession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, default: null })
    deviceId: string;

    @Column({ unique: true, default: null })
    deviceToken: string;

    @Column({ default: null })
    refreshToken: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.deviceSessions)
    user: User;

    @OneToMany(() => Apoiment, (apoiment) => apoiment.deviceSession)
    apoiment: Apoiment[]
}