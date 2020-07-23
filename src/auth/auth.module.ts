import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRpository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRpository]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { 
        expiresIn: '60s' 
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
