import { Module } from "@nestjs/common";
import { ApoimentController } from "./apoiment.controller";
import { ApoimentService } from "./apoiment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apoiment } from "src/databases/entity/apoiment.entity";
import { User } from "src/databases/entity/user.entity";
import { DeviceSession } from "src/databases/entity/device-session.entity";
import { UserService } from "../user/user.service";
import { CSVService } from "src/common/utils/csv.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([Apoiment, User, DeviceSession]),
    ],
    controllers: [ApoimentController],
    providers: [ApoimentService, UserService, CSVService]
})
export class ApoimentModule { }