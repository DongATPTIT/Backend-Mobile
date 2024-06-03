import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "src/databases/entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceSession } from "src/databases/entity/device-session.entity";
import { CSVService } from "src/common/utils/csv.service";
// import { QueueModule } from "../rabbitmq/rabbitmq.module";


@Module({
    controllers: [UserController],
    providers: [UserService, CSVService],
    imports: [
        TypeOrmModule.forFeature([User, DeviceSession]),
        // QueueModule
    ],
    exports: [UserService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply()
            // .forRoutes({ path: 'user/update', method: RequestMethod.PATCH })
            .forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}