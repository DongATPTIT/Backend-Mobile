import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, ForbiddenException, HttpException, HttpStatus, UseInterceptors, ValidationPipe, ClassSerializerInterceptor, Inject, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "src/common/decorator/role.decorator";
import { UserRoles } from "src/common/utils/user.role";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IdParamDto } from "src/module/user/dto/id-param.dto";
import { UserDto } from "src/module/user/dto/user.dto";
import { successMessage } from "src/common/utils/get-respone-success";


@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('user')

export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    // Get------------------------------------------------------


    @Roles(UserRoles.ADMIN)
    @ApiOperation({ summary: "Admin lấy tất cả user" })
    @Get()
    async findAllUser() {
        const users = await this.userService.findAllUser();
        return successMessage(users)
    }


    @ApiOperation({ summary: "Admin tìm kiếm người dùng theo keyword" })
    @Get('find-by-name/:name')
    async findByname(@Param('keyword') keyword: string) {
        const userByKeyword = await this.userService.findByName(keyword);
        return successMessage(userByKeyword);

    }





    // Patch------------------------------------------------------


    @ApiOperation({ summary: "Thay đổi thông tin người dùng " })
    @Patch('/update-my-profile')
    async update(@Req() req, @Body() body: UserDto) {
        const userId = req?.user?.sub;
        return await this.userService.updateUser(userId, body);
    }


    // Delete ----------------------------------------------------
    // @Roles(UserRoles.ADMIN)
    @ApiOperation({ summary: "Admin xóa người dùng" })
    @Delete('/:id')
    async delete(@Param() param: IdParamDto) {
        return await this.userService.deleteUser(param.id);

    }




    // Post----------------------------------------------------


    @Post('/save-device-token/:id')
    async saveDeviceToken(@Req() req, @Body() token: string) {
        const userId = req?.user?.sub;
        return await this.userService.updateDeviceToken(userId, token);
    }


    @Post('/exportCSV')
    async exportCSV() {
        const filePathCSV = await this.userService.exportCSVFile();
        return successMessage(filePathCSV);
    }





}
