import { Injectable } from '@nestjs/common';
import { UserRpository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRpository)
        private userRepository: UserRpository,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);

    }

}
