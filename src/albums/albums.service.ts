import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import * as mongoose from 'mongoose';
import { Artist } from 'src/auth/schema/artist.schema';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectModel(Album.name)
        private albumModel: mongoose.Model<Album>
    ) { }

    async findAll(): Promise<Album[]> {
        const albums = await this.albumModel.find()
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

    async createAlbum(album: Album, artist: Artist): Promise<Album> {
        const data = Object.assign(album, { artist: artist._id })
        const newAlbum = await this.albumModel.create(album)
        return newAlbum
    }

    async updateById(id: string, album: Album): Promise<Album> {
        return await this.albumModel.findByIdAndUpdate(id, album, {
            runValidators: true
        })
    }

    async deleteById(id: string) {
        return await this.albumModel.findByIdAndDelete(id)
    }

}