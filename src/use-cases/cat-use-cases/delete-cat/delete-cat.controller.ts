import { CatService } from "@db/cat/cat.service";
import { Controller, Delete, HttpCode, HttpException, HttpStatus, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('cats')
@Controller('cats')
export class DeleteCatController {
    constructor(
        private readonly catService: CatService,
    ) { }

    @Delete(':id')
    @HttpCode(204)
    async execute(@Param('id') id: string): Promise<void> {
        const cat = await this.catService.findById(id);
        if (!cat)
            throw new HttpException('Category Not Found', HttpStatus.BAD_REQUEST);

        await this.catService.delete(id);
    }
}