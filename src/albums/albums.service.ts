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