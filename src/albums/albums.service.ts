import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import * as mongoose from 'mongoose';
import { Artist } from 'src/auth/schema/artist.schema';
import * as jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose';
import { Request } from 'express'
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Song } from './schemas/song';
import { existsSync, unlinkSync } from 'fs';
import { extname } from 'path';

@Injectable()
export class AlbumsService {

    constructor(
        @InjectModel(Album.name)
        private albumModel: mongoose.Model<Album>,
        @InjectModel(Artist.name)
        private artistModel: mongoose.Model<Artist>
    ) { }

    async findAll(req): Promise<Album[]> {
        const artist: any = await this.parseToken(req)
        if (!artist) {
            throw new BadRequestException('Cookie not found')
        }
        const albums = await this.albumModel.find({ artist: artist._id.valueOf() })
        return albums
    }

    async findById(id: string): Promise<Album> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Please enter a valid ID')
        }
        const album = await this.albumModel.findById(id)
        if (!album) {
            throw new NotFoundException('Album not found')
        }
        return album
    }

    async createAlbum(req: Request): Promise<Album> {
        const album = req.body
        if (!album) {
            throw new BadRequestException('Empty data set')
        }
        const artist: any = await this.parseToken(req)
        const data = { ...album, artist: artist.id.valueOf() }
        const newAlbum = await this.albumModel.create(data)
        return newAlbum
    }

    async setAlbumArtPath(albumId: string, albumArtPath: string): Promise<Album> {
        const album = await this.albumModel.findById(albumId);
    
        if (!album) {
          throw new NotFoundException('Album not found');
        }

        album.albumArtPath = albumArtPath;

        await album.save();
    
        return album;
      }
      
    async deleteAlbumArtPath(albumId: string): Promise<Album> {
        const updatedAlbum = await this.albumModel.findOneAndUpdate(
            { _id: albumId },
            { $unset: { albumArtPath: 1 } },
            { new: true },
        );

        return updatedAlbum;
    }

    async uploadAlbumImage(file: Express.Multer.File, id: string){
        console.log('uploading album art in-progress');
        if (!file) {
            console.log('no file selected')
            throw new BadRequestException('File not selected. Select a file to upload');
        }
  
        const imageExtensions = ['.png', '.jpg','.jpeg']
        const fileExtension=extname(file.originalname)
        if (!imageExtensions.includes(fileExtension)){
            console.log('invalid file type input')
            throw new BadRequestException('Invalid file format. Only png, jpg, and jpeg formats are valid');
        }

        const albumArtPath = file.path;

        try {
            await this.setAlbumArtPath(id, albumArtPath);
            console.log('upload successful')
            return { statusCode: 200, message: 'Album art upload completed successfully.' };
        } catch (error) {
            console.error('Error setting album art path:', error);
            throw new InternalServerErrorException('Internal server error.');
        }
        
        
        // return { statusCode: 200, message: 'Album art upload completed successfully.' };
    }

    async deleteAlbumArt(id:string, req: Request){
        const album = await this.findById(id);
        if (!album) {
          throw new NotFoundException('Album not found');
        }
        
        if (album.albumArtPath) {
            const filePath = "./"+album.albumArtPath
            if (!existsSync(album.albumArtPath)) {
                throw new NotFoundException('File not found');
              }
            try {
                unlinkSync(filePath);
                const updatedAlbum= await this.deleteAlbumArtPath(id);
                console.log(updatedAlbum)
            } catch (error) {
                console.error('Error deleting album art:', error);
            }
            
        }
    }

    async updateById(id: string, req: Request): Promise<Album> {
        const updates = req.body
        if (!updates) {
            throw new BadRequestException('Empty data set')
        }
        const artistFromToken: any = await this.parseToken(req)
        const album = await this.albumModel.findById(id)
        if (artistFromToken._id.valueOf() !== album.artist) {
            throw new UnauthorizedException('Only creators of an album can edit it.')
        }
        return await this.albumModel.findByIdAndUpdate(id, updates)
    }

    async deleteById(id: string, req: Request) {
        const artistFromToken: any = await this.parseToken(req)
        const artistFromAlbum = await this.albumModel.findById(id)
        if (artistFromToken._id.valueOf() !== artistFromAlbum.artist) {
            throw new UnauthorizedException('Only creators of an album can edit it.')
        }
        return await this.albumModel.findByIdAndDelete(id)
    }

    async addSong(id: string, req: Request) {
        const song: Song = req.body
        if (!song) {
            throw new BadRequestException('Empty data set')
        }
        const artistFromToken: any = await this.parseToken(req)
        const album = await this.albumModel.findById(id)
        if (artistFromToken._id.valueOf() !== album.artist) {
            throw new UnauthorizedException('Only creators of an album can add songs')
        }
        const duplicateName = album.songs.find(item => item.name === song.name)
        if (duplicateName) {
            throw new BadRequestException('A song with a similar name already exists on this album')
        }
        album.songs.push(song)
        await album.save()
        return album.songs
    }

    async uploadSong(file:Express.Multer.File ,id:string){

        console.log('uploading song in-progress');
        if (!file) {
            console.log('no file selected')
            throw new BadRequestException('File not selected. select a file to upload');     
        }
  
        const audioExtensions = ['.mp3', '.wav']
        const fileExtension=extname(file.originalname)
        if (!audioExtensions.includes(fileExtension)){
            console.log('invalid file type input')
            throw new BadRequestException('invalid file format only mp3 and wav formats are valid')
        }
        
        const songPath = file.path;
        const songName=file.originalname
        console.log(file)
        try {
            await this.setSongPath(id, songName, songPath);
        } catch (error) {
            console.error('Error setting album art path:', error);
            throw new InternalServerErrorException('Internal server error.');
        }
        console.log
        console.log('upload successful')
        return { statusCode: 200, message: 'Song upload completed successfully.' }
    }

    async setSongPath(id: string, songName: string, songPath: string): Promise<Album> {
        try {
            const document = await this.albumModel.findOne({ _id: id })
      
            if (!document) {
              throw new Error('Document not found');
            }
            console.log(document)
            const songIndex = document.songs.findIndex(song => song.name == songName);
      
            if (songIndex !== -1) {
                document.songs[songIndex] = {
                    name: document.songs[songIndex].name,
                    filePath: songPath
                }
            
              await document.save();
              console.log(document)
              return document;
            }
            else{
                console.log('name not found')
                throw new NotFoundException('File name not found');
            }
        } catch (error) {
            throw new Error(`Failed to update song1 released date: ${error.message}`);
        }     
    } 

    async deleteSongPath(id: string, songName: string, songPath: string): Promise<Album> {
        try {
            const document = await this.albumModel.findOne({ _id: id })
            if (!document) {
              throw new Error('Document not found');
            }
            console.log(document)
            const songIndex = document.songs.findIndex(song => song.name == songName);
      
            if (songIndex !== -1) {
                document.songs[songIndex] = {
                    name: document.songs[songIndex].name,
                    filePath: null
                }
            
              await document.save();
              console.log(document)
              return document;
            }
            else{
                console.log('name not found')
                throw new NotFoundException('File name not found');
            }
        } catch (error) {
            throw new Error(`Failed to update song1 released date: ${error.message}`);
        }     
    }   
    
    async deleteSongFile(id: string, req:Request, songName:string){
        console.log(songName)
        const document = await this.albumModel.findOne({ _id: id })
      
        if (!document) {
          throw new Error('Document not found');
        }
        console.log(document)
        const songIndex = document.songs.findIndex(song => song.name == songName);
        console.log("index:", songIndex, "songname: ", songName)
        if (songIndex !== -1) {
            const filePath=document.songs[songIndex].filePath
            if (!existsSync(filePath)) {
                throw new NotFoundException('File not found');
              }
            try {
                unlinkSync(filePath);
                const updatedAlbum= await this.deleteSongPath(id, document.songs[songIndex].name, filePath);
                console.log(updatedAlbum)
            } catch (error) {
                console.error('Error deleting song:', error);
            }
        }else{
            throw new NotFoundException('File not found');
        }

        await document.save();
        console.log(document)
        return document;
    }

    async removeSong(id: string, req: Request) {
        const song: Song = req.body
        if (!song) {
            throw new BadRequestException('Empty data set')
        }
        const artistFromToken: any = await this.parseToken(req)
        const album = await this.albumModel.findById(id)
        if (artistFromToken._id.valueOf() !== album.artist) {
            throw new UnauthorizedException('Only creators of an album can remove songs')
        }
        let found = false
        album.songs = album.songs.filter(item => {
            if (item.name === song.name) {
                found = true
                return false
            }
            return true
        })
        if (!found) {
            throw new BadRequestException('Song does not exist in the Album')
        }
        await album.save()
        return album.songs
    }

    async parseToken(req: Request) {
        try {
            if (!req.cookies?.accessToken) {
                throw new BadRequestException('Cookie not found')
            }
            const token = req.cookies.accessToken
            const decoded = await jwt.verify(token, process.env.JWT_ACCESS_KEY)

            const idStr = (decoded as any).id
            const artist = await this.artistModel.findById(idStr)
            if (!artist) {
                throw new UnauthorizedException('User not found.')
            }
            return artist
        } catch (err) {
            throw new InternalServerErrorException(err.message)
        }
    }

}