import { IsNotEmpty, IsNumber } from "class-validator";

export class ApoimentDto {
    time?: Date;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}