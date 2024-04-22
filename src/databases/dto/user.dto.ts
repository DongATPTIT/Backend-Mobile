import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";
import { UserRoles } from "src/common/utils/user.role";

export class UserDto {
    @ApiProperty()
    @IsOptional()
    name?: string;

    @IsOptional()
    @ApiProperty()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsOptional()
    password?: string;

    @ApiProperty()
    @IsOptional()
    age?: number;

    @ApiProperty()
    @IsOptional()
    role: UserRoles

    @ApiProperty()
    @IsOptional()
    refreshToken?: string;



}