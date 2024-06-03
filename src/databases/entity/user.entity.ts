import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { DeviceSession } from "./device-session.entity";
import { UserRoles } from "src/common/utils/user.role";
import { GroupUser } from "./group-user.entity";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    phone: number;

    @Exclude()
    @Column({ default: UserRoles.USER })
    role: UserRoles;

    @Column({ default: null })
    image: string;

    @ManyToOne(() => GroupUser, (group) => group.user)
    group: GroupUser;

    @OneToMany(() => DeviceSession, (deviceSessions) => deviceSessions.user)
    deviceSessions: DeviceSession[];
}