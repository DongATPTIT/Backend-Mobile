import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApoimentService } from "./apoiment.service";
import { ApoimentDto } from "src/databases/dto/apoiment.dto";


@Controller('apoiment')
export class ApoimentController {
    constructor(private readonly apoimentService: ApoimentService) { }

    @Post()
    async addApoiment(@Body() data: ApoimentDto) {
        try {
            console.log(data)
            return await this.apoimentService.addApoiment(data);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    @Get("/all")
    async getAllApoiment() {
        return await this.apoimentService.getApoiment();
    }
    @Get("/:id")
    async getApoimentByUserId(@Param("id") id: number) {
        return await this.apoimentService.getApoimentByUserId(id)
    }

    @Delete("/:id")
    async deleteApoiment(@Param("id") id: number) {
        console.log(id)
        return await this.apoimentService.delApoimentByid(id)
    }

}