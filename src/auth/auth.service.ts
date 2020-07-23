import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
        ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);

    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{access_token: string}> {
        const {username, password} = authCredentialsDto
        const match =  await this.userRepository.signIn(authCredentialsDto);
        if (!match) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload: JwtPayload =  {username};
        return {
            access_token: this.jwtService.sign(payload),
          };  
    }

}
