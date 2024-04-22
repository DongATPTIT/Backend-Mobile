import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RegisterAccountDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

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