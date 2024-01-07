import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist } from './schema/artist.schema';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Artist.name)
        private artistModel: Model<Artist>,
        private jwtService: JwtService
    ) { }

    async signUp(reqBody: SignUpDto): Promise<{ token: string }> {
        const artistObj = { ...reqBody }
        const hashedPwd = await bcrypt.hash(reqBody.password, 10)
        artistObj.password = hashedPwd
        const artist = await this.artistModel.create(artistObj)
        console.log(artist)
        const accessToken = this.jwtService.sign({ id: artist._id })
        return { token: accessToken }
    }

    async logIn(reqBody: LogInDto): Promise<{ token: string }> {
        const accObj = { ...reqBody }
        const artist = await this.artistModel.findOne({ email: accObj.email })
        if (!artist) {
            throw new UnauthorizedException('Invalid email or password')
        }
        const valid = await bcrypt.compare(accObj.password, artist.password)
        let accessToken: string
        if (valid) {
            accessToken = this.jwtService.sign({ id: artist._id })
        }
        return { token: accessToken }
    }
}
