import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/common/decorator/public-auth-guard.decorator";
import { LogInDto } from "src/databases/dto/login.dto";
import { RegisterAccountDto } from "src/databases/dto/register-account.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { successMessage } from "src/common/utils/get-respone-success";
import { Request } from "express";

@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @ApiOperation({ summary: "Đăng nhập" })
    @Post('/login')
    async signIn(@Body() user: LogInDto) {
        try {
            console.log(user)
            const result = await this.authService.signIn(user.username, user.password);
            return successMessage(result)
        }
        catch {
            throw new HttpException("Can not sign in ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Public()
    @ApiOperation({ summary: "Đăng kí" })
    @Post('/register')
    async create(@Body() user: RegisterAccountDto) {
        try {
            const result = await this.authService.createUser(user);
            return successMessage(result);
        }
        catch {
            throw new HttpException("Can not register ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/logout')
    @ApiOperation({ summary: "Đăng xuất" })
    async logout(@Req() req) {
        try {
            const user = req.user?.sub;
            const result = await this.authService.logOut(user);
            return successMessage(result)
        } catch {
            throw new HttpException("Can not logout", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Refresh access token" })
    @Post('/refresh-token')
    async refreshTokens(@Req() req) {
        try {
            const user = req.user;
            const userId = user?.sub;
            const token = req?.headers.authorization;
            const refresh_token = token.replace('Bearer', '').trim();
            const result = await this.authService.refreshTokens(userId, refresh_token);
            return successMessage(result)
        }
        catch {
            throw new HttpException("Can not get refresh token", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/check-auth-token')
    async CheckAuthTokenSocket(@Req() req) {
        try {
            return await req.user
        }
        catch (error) {
            console.log(error);
        }
    }




}   