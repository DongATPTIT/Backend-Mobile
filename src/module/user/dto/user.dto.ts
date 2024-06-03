import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
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
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
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