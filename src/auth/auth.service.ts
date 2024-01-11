import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist } from './schema/artist.schema';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { Admin } from './schema/admin.schema';
import { AdminSignUpDto } from './dto/signup-admin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Artist.name)
        private artistModel: Model<Artist>,
        @InjectModel(Admin.name)
        private adminModel: Model<Admin>,
        private jwtService: JwtService
    ) { }

    async signUp(reqBody: SignUpDto): Promise<{ token: string }> {
        const artistObj = { ...reqBody }
        const hashedPwd = await bcrypt.hash(reqBody.password, 10)
        artistObj.password = hashedPwd
        const artist = await this.artistModel.create(artistObj)
        console.log(artist)
        const accessToken = this.jwtService.sign({ id: artist._id, role: 1 })
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
            accessToken = this.jwtService.sign({ id: artist._id, role: 1 })
        }
        return { token: accessToken }
    }

    async adminSignUp(reqBody: AdminSignUpDto): Promise<{ token: string }> {
        const adminObj = { ...reqBody }
        const hashedPwd = await bcrypt.hash(reqBody.password, 10)
        adminObj.password = hashedPwd
        const admin = await this.adminModel.create(adminObj)
        console.log(admin)
        const accessToken = this.jwtService.sign({ id: admin._id, role: 0 })
        return { token: accessToken }
    }

    async adminLogIn(reqBody: LogInDto): Promise<{ token: string }> {
        const accObj = { ...reqBody }
        const admin = await this.adminModel.findOne({ email: accObj.email })
        if (!admin) {
            throw new UnauthorizedException('Invalid email or password')
        }
        const valid = await bcrypt.compare(accObj.password, admin.password)
        let accessToken: string
        if (valid) {
            accessToken = this.jwtService.sign({ id: admin._id, role: 0 })
        }
        return { token: accessToken }
    }
}
