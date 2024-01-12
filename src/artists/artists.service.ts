import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import mongoose from 'mongoose';
import { Admin } from 'src/auth/schema/admin.schema';
import { Artist } from 'src/auth/schema/artist.schema';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { Album } from 'src/albums/schemas/album.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectModel(Artist.name)
        private artistModel: mongoose.Model<Artist>,
        @InjectModel(Admin.name)
        private adminModel: mongoose.Model<Admin>,
        @InjectModel(Album.name)
        private albumModel: mongoose.Model<Album>
    ) { }

    async parseToken(req: Request) {
        try {
            if (!req.cookies?.accessToken) {
                throw new BadRequestException('Cookie not found')
            }
            const token = req.cookies.accessToken
            const decoded = await jwt.verify(token, process.env.JWT_ACCESS_KEY)
            const idStr = (decoded as any).id
            const role = Number((decoded as any).role)
            const admin = await this.adminModel.findById(idStr)
            if (role !== 0) throw new UnauthorizedException('Logged in as an Artist, not as an Admin')
            if (!admin) {
                throw new UnauthorizedException('User not found.')
            }
            return admin
        } catch (err) {
            throw new InternalServerErrorException(err.message)
        }
    }

    async getArtists(req: Request) {
        await this.parseToken(req)
        return this.artistModel.find({})
    }

    async updateArtist(id: string, req: Request) {
        await this.parseToken(req)
        if (!ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID provided in the route')
        }
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        await this.artistModel.findByIdAndUpdate(id, req.body)
        return this.artistModel.findById(id)
    }

    async deleteArtist(id: string, req: Request) {
        if (!ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID provided in the route')
        }
        await this.parseToken(req)
        const artist = await this.artistModel.findById(id)
        if (!artist) {
            throw new BadRequestException('Artist with the provided ID does not exist.')
        }
        await this.albumModel.deleteMany({ artist: artist._id.valueOf() })
        await this.artistModel.findByIdAndDelete(id, req.body)
    }
}
