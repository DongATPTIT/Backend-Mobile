import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";

export class RegisterAccountDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    password?: string;

    @ApiProperty()
    address?: string;

    @ApiProperty()
    phone?: number;

    @ApiProperty({ default: null })
    image?: string;

    @ApiProperty({ default: null })
    refreshToken?: string;

    @ApiProperty({ default: null })
    groupID?: number;
}