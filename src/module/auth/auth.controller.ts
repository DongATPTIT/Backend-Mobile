import { Body, Controller, Get, Headers, HttpException, HttpStatus, Post, Req, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/common/decorator/public-auth-guard.decorator";

import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { successMessage } from "src/common/utils/get-respone-success";
import { LogInDto } from "./dto/login.dto";
import { RegisterAccountDto } from "./dto/register-account.dto";
import { User } from "src/databases/entity/user.entity";

@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @ApiOperation({ summary: "Đăng nhập" })
    @Post('/login')
    async signIn(@Body() user: LogInDto, @Req() req) {
        const deviceId = req.fingerprint.hash;
        const signIn = await this.authService.signIn(user.username, user.password, deviceId);
        return successMessage(signIn);
    }

    @Public()
    @ApiOperation({ summary: "Đăng kí" })
    @Post('/register')
    async createUser(@Body() user: RegisterAccountDto, @Req() req) {
        const deviceId = req.fingerprint.hash;
        const newUser = await this.authService.createUser(user, deviceId);
        return successMessage(newUser);
    }

    @Post('/logout')
    @ApiOperation({ summary: "Đăng xuất" })
    async logout(@Req() req) {
        const deviceId = req.fingerprint.hash;
        const userId = req.user?.sub;
        const resultLogout = await this.authService.logOut(userId, deviceId);
        return successMessage(resultLogout);
    }

    @ApiOperation({ summary: "Refresh access token" })
    @Post('/refresh-token')
    async refreshTokens(@Req() req) {
        const userId = req?.user?.sub;
        const token = req?.headers.authorization;
        const deviceId = req.fingerprint.hash;
        const refreshToken = token.replace('Bearer', '').trim();
        const getNewRefreshToken = await this.authService.refreshTokens(userId, refreshToken, deviceId);
        return successMessage(getNewRefreshToken);
    }

    @Get('/check-auth-token')
    CheckAuthTokenSocket(@Req() req) {
        return req.user;

    }
}   