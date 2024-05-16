import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApoimentDto } from "src/databases/dto/apoiment.dto";
import { Apoiment } from "src/databases/entity/apoiment.entity";
import { User } from "src/databases/entity/user.entity";
import { Repository } from "typeorm";
import { format } from 'date-fns';


@Injectable()
export class ApoimentService {
    constructor(@InjectRepository(Apoiment)
    private apoimentRepository: Repository<Apoiment>,
        @InjectRepository(User)
        private userRepo: Repository<User>) { }


    async addApoiment(data: ApoimentDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: data.userId } });
            if (!user) {
                throw new Error(`user not found`)
            }
            const apoiment = await this.apoimentRepository.save({
                ...data,
                user
            });
            return apoiment;

        } catch (error) {
            throw new Error(error);
        }
    }

    async getApoiment() {
        const currentTime = format(new Date(), 'HH:mm');
        // console.log(currentTime)
        const apoiments = await this.apoimentRepository
            .createQueryBuilder("apoiment")
            .where("apoiment.time = :currentTime ", { currentTime })
            .leftJoinAndSelect('apoiment.user', 'user')
            .getMany();
        return apoiments;
    }

    async getApoimentByUserId(userId: number) {
        const apoiments = await this.apoimentRepository
            .createQueryBuilder("apoiment")
            .where("apoiment.userId = :userId ", { userId })
            .leftJoinAndSelect('apoiment.user', 'user')
            .getMany();
        return {
            data: apoiments,
            title: "Lịch hẹn gặp bác sĩ"
        };
    }

    async delApoimentByid(id: number) {
        const results = await this.apoimentRepository.delete({ id: id });
        return results;
    }
}