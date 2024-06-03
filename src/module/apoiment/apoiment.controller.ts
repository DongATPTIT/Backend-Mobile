import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApoimentService } from "./apoiment.service";
import { ApoimentDto } from "./dto/apoiment.dto";
import { IdParamDto } from "../user/dto/id-param.dto";


@Controller('apoiment')
export class ApoimentController {
    constructor(private readonly apoimentService: ApoimentService) { }


    // /--------------------------POST --------------------------------
    @Post()
    async addApoiment(@Body() apoiment: ApoimentDto) {
        return await this.apoimentService.addApoiment(apoiment);
    }

    // -----------------------GET ------------------------
    @Get()
    async getAllApoiment() {
        return await this.apoimentService.getAllApoiment();
    }

    @Get("by-user/:id")
    async getApoimentByUserId(@Param("id") userId: IdParamDto) {
        return await this.apoimentService.getApoimentByUserId(userId.id);
    }



    // ---------------------DELETE ------------------------
    @Delete("/:id")
    async deleteApoiment(@Param("id") param: IdParamDto) {
        return await this.apoimentService.delApoimentByid(param.id);

    }


    // Patch
    @Patch("update/:id")
    async updateApoiment(@Param("id") param: IdParamDto, @Body() dataUpdate: ApoimentDto) {
        return await this.apoimentService.updateApoiment(param.id, dataUpdate)
    }


}