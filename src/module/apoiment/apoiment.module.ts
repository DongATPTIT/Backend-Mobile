import { Module } from "@nestjs/common";
import { ApoimentController } from "./apoiment.controller";
import { ApoimentService } from "./apoiment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apoiment } from "src/databases/entity/apoiment.entity";
import { User } from "src/databases/entity/user.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Apoiment, User]),
    ],
    controllers: [ApoimentController],
    providers: [ApoimentService]
})
export class ApoimentModule { }