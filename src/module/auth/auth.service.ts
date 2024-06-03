import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, Req, UnauthorizedException } from "@nestjs/common";
import { error } from "console";
import { UserService } from "src/module/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterAccountDto } from "src/module/auth/dto/register-account.dto";
import { DeviceSession } from "src/databases/entity/device-session.entity";



@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(DeviceSession) private deviceSession: Repository<DeviceSession>
    ) { }

    async createUser(user: RegisterAccountDto, deviceId: string) {
        try {
            const keywordFindUser = "username"
            const checkUserExists = await this.userService.findUserByKey(keywordFindUser, user.username);
            if (checkUserExists.length > 0) {
                throw new BadRequestException("user already exists");
            }
            user.password = await bcrypt.hash(user.password, 10);
            const newUser = await this.userService.addNewUser(user);
            const { password, refreshToken, ...rest } = newUser;
            const tokens = await this.getTokens(newUser.id, newUser.username);
            await this.updateRefreshToken(newUser.id, tokens.refreshToken, deviceId);
            return {
                message: "User created successfully",
                data: rest,
                tokens: { refreshToken: tokens.refreshToken, }
            };
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }

    }
    async signIn(username: string, pass: string, deviceId: string) {
        try {
            const user = await this.userService.findByUsername(username);
            if (!user) {
                throw new BadRequestException("user not found");
            }
            const checkPassword = await bcrypt.compare(pass, user.password);
            if (!checkPassword) {
                throw new BadRequestException("password is not match");
            }
            const tokens = await this.getTokens(user.id, user.username);

            await this.updateRefreshToken(user.id, tokens.refreshToken, deviceId);
            return {
                tokens: tokens.refreshToken,
            };
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async logOut(userId: number, deviceId: string) {
        try {
            const checkUserExists = await this.userService.checkUserExists(userId);
            if (!checkUserExists) {
                throw new BadRequestException('user not found');
            }
            await this.deviceSession.update({ deviceId: deviceId }, { refreshToken: null });
            return {
                message: "logout successfully",
            }
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async logOutAllUsers(id: number) {
        try {
            const user = await this.userService.findById(id);
            if (!user) {
                throw new BadRequestException('user not found');
            }
            await this.deviceSession.createQueryBuilder()
                .update(DeviceSession)
                .set({ refreshToken: null })
                .where('userId = :userId', { userId: id })
                .execute();
            return {
                message: "logout all users successfully",
            }
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateRefreshToken(userId: number, refreshToken: string, fingerprint: string) {
        try {
            const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
            const currentDevice = await this.deviceSession.findOne({
                where: { deviceId: fingerprint },
            });
            const user = await this.userService.findById(userId);
            if (!currentDevice) {
                if (!user) {
                    throw new BadRequestException("User not found");
                }
                await this.deviceSession.save({ deviceId: fingerprint, refreshToken: hashedRefreshToken, user: user });
            }
            return await this.deviceSession.update({ deviceId: fingerprint }, { deviceId: fingerprint, refreshToken: hashedRefreshToken, user: user });
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getTokens(userId: number, username: string) {
        try {
            const user = await this.userService.findById(userId);
            if (!user) {
                throw new BadRequestException("User not found");
            }
            const [accessToken, refreshToken] = await Promise.all([
                this.jwtService.signAsync(
                    {
                        sub: userId,
                        username: username,
                        // role: role,
                    },
                    {
                        secret: process.env.SECRET_KEY_ACCESS_TOKEN,
                        expiresIn: '15m',
                    },
                ),
                this.jwtService.signAsync(
                    {
                        sub: userId,
                        username: username,
                        // role: role
                    },
                    {
                        secret: process.env.SECRET_KEY_REFRESH_TOKEN,
                        expiresIn: '7d',
                    },
                ),
            ]);
            return {
                accessToken,
                refreshToken,
            };
        }
        catch (error) {
            throw new InternalServerErrorException(error);

        }
    }

    async refreshTokens(userId: number, refreshToken: string, deviceId: string) {
        try {
            const user = await this.userService.findById(userId);
            if (!user) {
                throw new BadRequestException("User not found");
            }
            const currentDevice = await this.deviceSession
                .createQueryBuilder("deviceSession")
                .leftJoinAndSelect("deviceSession.user", "user")
                .where("deviceSession.deviceId = :id", { id: deviceId })
                .getOne();
            if (!currentDevice || !currentDevice.refreshToken) {
                throw new BadRequestException('current device is not available');
            }
            const refreshTokenMatches = await bcrypt.compare(
                refreshToken,
                currentDevice.refreshToken,
            );
            if (!refreshTokenMatches) {
                throw new BadRequestException('token mismatch');
            }
            const tokens = await this.getTokens(currentDevice.user.id, currentDevice.user.username,);
            await this.updateRefreshToken(currentDevice.user.id, tokens.refreshToken, deviceId);
            return tokens;
        }
        catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}