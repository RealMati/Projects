import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import mongoose from 'mongoose';
import { Admin } from 'src/auth/schema/admin.schema';
import { Artist } from 'src/auth/schema/artist.schema';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class ArtistsService {
    constructor(
        @InjectModel(Artist.name)
        private artistModel: mongoose.Model<Artist>,
        @InjectModel(Admin.name)
        private adminModel: mongoose.Model<Admin>
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
    }

    async updateArtist(id: string, req: Request) {
        await this.parseToken(req)
    }

    async deleteArtist(id: string, req: Request) {
        await this.parseToken(req)
    }
}
