import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './schemas/album.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express'

@Controller('albums')
export class AlbumsController {
    constructor(
        private albumService: AlbumsService
    ) { }

    @Get()
    async getAllAlbums(@Req() req: Request): Promise<Album[]> {
        return this.albumService.findAll(req)
    }

    @Get(':id')
    async findAlbumById(@Param('id') id: string): Promise<Album> {
        return this.albumService.findById(id)
    }

    @Post()
    async createAlbum(@Req() req: Request): Promise<Album> {
        return this.albumService.createAlbum(req)
    }

    @Put(':id')
    async updateAlbum(@Param('id') id: string, @Req() req: Request) {
        return await this.albumService.updateById(id, req)
    }

    @Delete(':id')
    async deleteAblum(@Param('id') id: string, @Req() req: Request) {
        return await this.albumService.deleteById(id, req)
    }
}
