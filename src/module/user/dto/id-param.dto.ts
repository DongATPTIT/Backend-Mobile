import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString } from "class-validator";

export class IdParamDto {
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    id: number;
}
