import { Injectable } from '@nestjs/common';
import { UserRpository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRpository)
        private userRepository: UserRpository,
    ) {}

}
