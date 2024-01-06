import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './schemas/album.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('albums')
export class AlbumsController {
    constructor(
        private albumService: AlbumsService
    ) { }

    @Get()
    async getAllAlbums(): Promise<Album[]> {
        return this.albumService.findAll()
    }

    @Get(':id')
    async findAlbumById(@Param('id') id: string): Promise<Album> {
        return this.albumService.findById(id)
    }

    @Post()
    @UseGuards(AuthGuard())
    async createAlbum(@Body() album: CreateAlbumDto, @Req() req): Promise<Album> {
        return this.albumService.createAlbum(album, req.user)
    }

    // check if the album belongs to the artist that is making the request
    @Put(':id')
    @UseGuards(AuthGuard())
    async updateAlbum(@Param('id') id: string, @Body() album: UpdateAlbumDto) {
        return await this.albumService.updateById(id, album)
    }

    // check if the album belongs to the artist that is making the request
    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteAblum(@Param('id') id: string) {
        return await this.albumService.deleteById(id)
    }
}
