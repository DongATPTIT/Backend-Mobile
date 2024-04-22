import { Controller, Get, Post, Body, Param, Request, Patch, Delete, ParseIntPipe, ForbiddenException, HttpException, HttpStatus, UseInterceptors, ValidationPipe, ClassSerializerInterceptor, Inject } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "src/common/decorator/role.decorator";
import { UserRoles } from "src/common/utils/user.role";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IdParamDto } from "src/databases/dto/id-param.dto";
import { Public } from "src/common/decorator/public-auth-guard.decorator";
import { UserDto } from "src/databases/dto/user.dto";
import { successMessage } from "src/common/utils/get-respone-success";


@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('user')

export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Roles(UserRoles.ADMIN)
    @ApiOperation({ summary: "Admin lấy tất cả user" })
    @Get()
    async findUser() {
        try {
            const result = await this.userService.findAllUser();
            return successMessage(result)
        } catch {
            throw new HttpException("Can not get users ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Roles(UserRoles.ADMIN)
    @ApiOperation({ summary: "Admin tìm kiếm người dùng theo keyword" })
    @Get('/:keyword')
    async findByname(@Param('keyword') keyword: string) {
        try {
            const data = await this.userService.findByName(keyword);
            return successMessage(data);
        }
        catch {
            throw new HttpException("Can not get users ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Roles(UserRoles.ADMIN)
    @ApiOperation({ summary: "Admin thay đổi thông tin người dùng " })
    @Patch('/:id')
    async update(@Param() param: IdParamDto, @Body(new ValidationPipe()) body: UserDto) {
        try {
            return await this.userService.updateUser(param.id, body);
        }
        catch {
            throw new HttpException("Can not update ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Roles(UserRoles.ADMIN)
    @ApiOperation({ summary: "Admin xóa người dùng" })
    @Delete('/:id')
    async delete(@Param() param: IdParamDto) {
        try {
            return await this.userService.deleteUser(param.id);
        }
        catch {
            throw new HttpException("Can not delete user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // @Public()
    // @Get('/send/sendmail')
    // async sendMail(@Body() user: any) {
    //     try {
    //         const result = await this.userService.sendMail(user);
    //         return successMessage(result);
    //     }
    //     catch {
    //         throw new HttpException("Can not send mail ", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
