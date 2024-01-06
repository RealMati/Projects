import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Artist } from "./schema/artist.schema";
import { Model } from "mongoose";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(Artist.name)
        private artistModel: Model<Artist>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_KEY
        })
    }

    async validate(payload) {
        const { id } = payload
        const artist = await this.artistModel.findById(id)
        if (!artist) {
            throw new UnauthorizedException('Unauthorized: access JWT required')
        }
        return artist
    }
}