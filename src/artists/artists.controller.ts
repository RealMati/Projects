import { Controller, Delete, Get, Param, Put, Render, Req } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Request } from 'express';
import { Artist } from 'src/auth/schema/artist.schema';

@Controller('artists')
export class ArtistsController {
    constructor(
        private artistService: ArtistsService
    ) { }

    @Get('/manage')
    @Render('artist')
    getPage() { return }

    @Get()
    async getArtists(@Req() req: Request) {
        return this.artistService.getArtists(req)
    }

    @Put(':id')
    async updateArtist(@Param('id') id: string, @Req() req: Request) {
        return this.artistService.updateArtist(id, req)
    }

    @Delete(':id')
    async deleteArtist(@Param('id') id: string, @Req() req: Request) {
        return this.artistService.deleteArtist(id, req)
    }
}
