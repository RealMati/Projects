import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, Render, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './schemas/album.schema';
import { Request, Response } from 'express'
import { Query as EQuery } from 'express-serve-static-core'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';

@Controller('albums')
export class AlbumsController {
    constructor(
        private albumService: AlbumsService
    ) { }

    @Get()
    @Render('artist-home')
    async getAllAlbums(@Req() req: Request, @Res() res: Response, @Query() query: EQuery): Promise<Album[]> {
        return this.albumService.findAll(req, res, query)
    }

    @Get(':id')
    async findAlbumById(@Param('id') id: string): Promise<Album> {
        return this.albumService.findById(id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('albumArt', {
        storage: diskStorage({
            destination: './local/album-thumbnails',
            filename: (req, file, callback) => {
                callback(null, Date.now() + `${file.originalname}`)
            }
        }),
        fileFilter: (req, file, callback) => {
            const imageExtensions = ['.png', '.jpg', '.jpeg'];
            const fileExtension = extname(file.originalname);
            if (imageExtensions.includes(fileExtension)) {
                callback(null, true);
            } else {
                console.log('Invalid file format. Only png, jpg and jpeg formats are accepted')
                callback(null, false);
                return
            }
        },
    }))
    async createAlbum(@Req() req: Request, @Res() res: Response, @UploadedFile() file: Express.Multer.File): Promise<Album> {
        return this.albumService.createAlbum(req, res, file)
    }

    @Put(':id')
    async updateAlbum(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        return await this.albumService.updateById(id, req, res)
    }

    @Delete(':id')
    async deleteAblum(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        return await this.albumService.deleteById(id, req, res)
    }

    // routes for songs
    @Post('songs/:id')
    @UseInterceptors(FileInterceptor('song', {
        storage: diskStorage({
            destination: './local/audio',
            filename: (req, file, callback) => {
                callback(null, Date.now() + `${file.originalname}`)
            }
        }),
        fileFilter: (req, file, callback) => {
            const imageExtensions = ['.mp3', '.wav'];
            const fileExtension = extname(file.originalname);
            if (imageExtensions.includes(fileExtension)) {
                callback(null, true);
            } else {
                console.log('invalid file format only mp3 and wav formats are valid')
                callback(null, false);
                return
            }
        },
    }))
    async addSong(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {
        return await this.albumService.addSong(id, req, res, file)
    }

    @Delete('songs/:id')
    async removeSong(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        return await this.albumService.removeSong(id, req, res)
    }
}