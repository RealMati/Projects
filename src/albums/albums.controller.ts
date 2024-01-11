import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './schemas/album.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';
import { error } from 'console';
import { existsSync, unlink, unlinkSync } from 'fs';

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

    @Post('/albumArtUploads/:id')
    @UseInterceptors(FileInterceptor('albumArt', {
        storage: diskStorage({
            destination : './local/album-thumbnails',
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
                console.log('invalid file format only png, jpg and jpeg formats are valid')
                callback(null, false);
                return
            }
        },
    }))
    async uploadAlbumImage(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {

        return await this.albumService.uploadAlbumImage(file,id)
    }

    @Delete('albumArtUploads/:id')
    async deleteAlbumArt(@Param('id') id: string, @Req() req: Request ) {
        
        return await this.albumService.deleteAlbumArt(id,req)
        
    }
 
    // routes for songs
    @Post('songs/:id')
    async addSong(@Param('id') id: string, @Req() req: Request) {
        return await this.albumService.addSong(id, req)
    }

    @Delete('songs/:id')
    async removeSong(@Param('id') id: string, @Req() req: Request) {
        return await this.albumService.removeSong(id, req)
    }
    
    @Post('/songUploads/:id')
    @UseInterceptors(FileInterceptor('song', {
        storage: diskStorage({
            destination : './local/audio',
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
    async uploadSong(@UploadedFile() file: Express.Multer.File,  @Param('id') id: string) {

        return await this.albumService.uploadSong(file, id)

    }

    @Delete('/songUploads/:id/:songName')
    async deleteSongFile(@Param('id') id: string, @Req() req: Request,@Param('songName') songName: string){
        console.log('Song Name:', songName);
        return await this.albumService.deleteSongFile(id, req, songName)
    }
}


