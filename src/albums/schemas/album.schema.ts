import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Artist } from "src/auth/schema/artist.schema";

@Schema()
export class Album {
    @Prop()
    title: string

    @Prop()
    type: "Album" | "Single"

    @Prop()
    genre: string

    @Prop()
    description: string

    @Prop()
    image: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
    artist: Artist
}

export const AlbumSchema = SchemaFactory.createForClass(Album)