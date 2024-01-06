import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from './schemas/album.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: 'Album', schema: AlbumSchema }])],
  controllers: [AlbumsController],
  providers: [AlbumsService]
})
export class AlbumsModule { }
