import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/databases/entity/user.entity";
import { Like, Repository } from "typeorm";
import { DeviceSession } from "src/databases/entity/device-session.entity";
import { CSVService } from "src/common/utils/csv.service";
import { classToPlain } from "class-transformer";
import { UserDto } from "./dto/user.dto";
import { RegisterAccountDto } from "../auth/dto/register-account.dto";
import * as bcrypt from "bcrypt";
import { successMessage } from "src/common/utils/get-respone-success";


@Injectable()
export class UserService {
    constructor(
        private readonly csvService: CSVService,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(DeviceSession) private deviceSession: Repository<DeviceSession>
    ) { }

    async addNewUser(user: RegisterAccountDto) {
        try {
            return await this.userRepository.save(user);
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    async updateDeviceToken(userId: number, deviceToken: string) {
        try {
            const checkUserExists = await this.checkUserExists(userId);
            if (!checkUserExists) {
                throw new BadRequestException(`User ${userId} does not exist`);
            }
            const updateDeviceToken = await this.deviceSession
                .createQueryBuilder()
                .update(DeviceSession)
                .set({ deviceToken: deviceToken })
                .where('id = :userId', { userId })
                .execute();
            return updateDeviceToken;
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    async findByUsername(username: string) {
        try {
            const user = await this.userRepository.findOne({ where: { username: username } });
            if (!user) {
                throw new BadRequestException(`User ${username} not found`);
            }
            return user;
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    async findByName(name: string) {
        try {
            const usersByName = await this.userRepository.find({
                where: {
                    name: Like(`${name}%`),
                },
            });
            if (usersByName.length == 0) {
                throw new BadRequestException("Users By Name does not exist")
            }
            return usersByName;
        }
        catch (error) {
            throw new InternalServerErrorException(error);;
        }
    }

    async findById(id: number): Promise<User> {
        try {
            const userById = await this.userRepository.findOne({ where: { id: id } });
            if (!userById) {
                throw new BadRequestException(`User ${id} does not exist`)
            }
            return userById;
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAllUser(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findUserByKey(key: string, value: string) {
        try {
            const conditon = { [key]: value };
            const userBykey = await this.userRepository.find({ where: conditon });
            if (!userBykey) {
                throw new BadRequestException(`User not found`);
            }
            return userBykey;
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async checkUserExists(id: number) {
        try {
            const user = await this.findById(id);
            return !!user;
        }
        catch (error) {
            throw new InternalServerErrorException(error);;
        }
    }

    async updateUser(id: number, userInfo: UserDto) {
        try {
            const checkUserExists = await this.checkUserExists(id);
            const user = await this.findById(id);
            if (userInfo.password) {
                const isPasswordCompare = await bcrypt.compare(userInfo?.password, user?.password);
                if (!checkUserExists || isPasswordCompare === true) {
                    throw new BadRequestException('Bad request: User does not exist or incorrect password');
                }
                userInfo.password = await bcrypt.hash(userInfo.password, 10);
            }

            await this.userRepository.update(id, { ...userInfo });
            const userUpdate = await this.findById(id);
            return {
                message: "Update successfuly",
                user: userUpdate
            };
        }
        catch (error) {
            throw new InternalServerErrorException(error);;
        }
    }

    async deleteUser(id: number) {
        try {
            const checkUserExists = await this.checkUserExists(id);
            if (!checkUserExists) {
                throw new BadRequestException('User not found')
            }
            await this.userRepository.delete(id);
            return {
                message: "User deleted",
            };

        }
        catch (error) {
            throw new InternalServerErrorException(error);;
        }
    }

    async exportCSVFile() {
        try {
            const users = await this.findAllUser();
            const userList = users.map(user => classToPlain(user));
            const fieldsName = ["name", "username", "address", "phone", "image"]
            const dataCSV = this.csvService.dataTranformCSV(userList, fieldsName);
            const fileName = `users-${new Date().toISOString()}.csv`;
            const path = `src/${fileName}`
            return await this.csvService.createFileCSV(path, fieldsName, dataCSV);
        }
        catch (error) {
            throw new InternalServerErrorException(error);;
        }
    }

}
