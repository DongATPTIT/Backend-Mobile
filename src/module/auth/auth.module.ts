import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/module/user/user.module";
import { UserService } from "src/module/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { User } from "src/databases/entity/user.entity";
import { DeviceSession } from "src/databases/entity/device-session.entity";
import { CSVService } from "src/common/utils/csv.service";
// import { QueueModule } from "../rabbitmq/rabbitmq.module";



@Module({
    imports: [
        TypeOrmModule.forFeature([User, DeviceSession]),
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY_ACCESS_TOKEN,
            // signOptions: { expiresIn: '60d' },
        }),
        // QueueModule

    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, CSVService],
})
export class AuthModule { }