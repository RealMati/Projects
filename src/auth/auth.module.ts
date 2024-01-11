import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistSchema } from './schema/artist.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTStrategy } from './jwt-strategy';
import { AdminSchema } from './schema/admin.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_ACCESS_KEY'),
          signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRATION') }
        }
      }
    }),
    MongooseModule.forFeature([{ name: 'Artist', schema: ArtistSchema }, { name: 'Admin', schema: AdminSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [JWTStrategy, PassportModule]
})
export class AuthModule { }
