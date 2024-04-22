import { ForbiddenException, Injectable } from "@nestjs/common";
import { error } from "console";
import { UserService } from "src/module/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
// import * as argon2 from 'argon2';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterAccountDto } from "src/databases/dto/register-account.dto";
import { User } from "src/databases/entity/user.entity";



@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createUser(dto: RegisterAccountDto) {
        try {
            const check = await this.userRepository.findOne({ where: { username: dto.username } });
            console.log(check);
            if (check !== null) {
                throw new Error("Email already exists");
            }
            dto.password = await bcrypt.hash(dto.password, 10);
            const newUser = await this.userRepository.save(dto);
            const { password, refreshToken, ...rest } = newUser;
            const tokens = await this.getTokens(newUser.id, newUser.username);
            await this.updateRefreshToken(newUser.id, tokens.refreshToken);
            // console.log(tokens.refreshToken)
            return {
                message: "User created successfully",
                data: rest,
                tokens: { refreshToken: tokens.refreshToken, }
            };
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error);
        }

    }
    async signIn(username: string, pass: string) {
        const user = await this.userService.findByEmail(username);
        if (!user) {
            throw new Error("Email not found");
        }
        const check = await bcrypt.compare(pass, user.password);
        if (!check) {
            throw new error
        }
        const tokens = await this.getTokens(user.id, user.username)

        // const payload = { sub: user.id, username: user.name, email: user.email, role: user.role };
        // const access_token = await this.jwtService.signAsync(payload);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            tokens: tokens.refreshToken,
        };
    }

    async logOut(id: number) {
        try {
            await this.userService.updateUser(id, { refreshToken: null });
            return {
                message: "logout successfully",
            }
        }
        catch (err) {
            throw new Error(err)
        }
    }

    // async logOutAllUsers() {
    //     const data = await this.userRepository.update(
    //         // { role: UserRoles.USER },
    //         { refreshToken: null }
    //     );
    //     return {
    //         message: "logout all users successfully",
    //     }
    // }

    async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userService.updateUser(userId, { refreshToken: hashedRefreshToken });
    }

    async getTokens(userId: number, username: string) {
        process.env.SECRET_KEY_ACCESS_TOKEN
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

    async refreshTokens(id: number, refreshToken: string) {
        const user = await this.userService.findById(id);
        if (!user || !user.refreshToken) {
            throw new ForbiddenException('Access Denied');
        }
        const refreshTokenMatches = await bcrypt.compare(
            refreshToken,
            user.refreshToken,
        );
        if (!refreshTokenMatches) {
            throw new ForbiddenException('Access Denied');
        }
        const tokens = await this.getTokens(user.id, user.username,);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
}