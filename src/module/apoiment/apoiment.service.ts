import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Apoiment } from "src/databases/entity/apoiment.entity";
import { Repository } from "typeorm";
import { format } from 'date-fns';
import { ApoimentDto } from "./dto/apoiment.dto";
import { UserService } from "../user/user.service";


@Injectable()
export class ApoimentService {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(Apoiment) private apoimentRepository: Repository<Apoiment>,
    ) { }


    async addApoiment(data: ApoimentDto) {
        try {
            const user = await this.userService.findById(data.userId)
            if (!user) {
                throw new BadRequestException('User not found');
            }
            return await this.apoimentRepository.save({
                ...data,
                user
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getAllApoiment() {
        try {
            return await this.apoimentRepository.find();
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getApoimentAtCurrentTime() {
        try {
            const currentTime = format(new Date(), 'HH:mm');
            console.log(currentTime)
            return await this.apoimentRepository
                .createQueryBuilder("apoiment")
                .where("apoiment.time = :currentTime ", { currentTime })
                .leftJoinAndSelect("apoiment.deviceSession", "deviceSession")
                .leftJoinAndSelect('deviceSession.user', 'user')
                .getMany();
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getApoimentByUserId(userId: number) {
        try {
            const user = await this.userService.findById(userId)
            if (!user) {
                throw new BadRequestException('User not found');
            }
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
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateApoiment(id: number, dataUpdate: ApoimentDto) {
        try {
            const apoiment = await this.apoimentRepository.find({ where: { id: id } });
            if (!apoiment) {
                throw new BadRequestException('apoiment not found');
            }
            return await this.apoimentRepository.update({ id: id }, { ...dataUpdate });
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async delApoimentByid(id: number) {
        try {
            const apoiment = await this.apoimentRepository.find({ where: { id: id } });
            if (!apoiment) {
                throw new BadRequestException('apoiment not found');
            }
            return await this.apoimentRepository.delete({ id: id });
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}