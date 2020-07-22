import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { throws } from 'assert';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import  * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRpository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hash(password, user.salt);
        try {
            await user.save();
        } catch (error) {
            switch (error.code) {
                // duplicate username
                case '23505':
                    throw new ConflictException('Username already excists');
                    break;
                default:
                    throw new InternalServerErrorException();
                    break;
            }
        }
    }

    private async hash(myPlaintextPassword: string, salt: string): Promise<string> {
        return bcrypt.hash(myPlaintextPassword, salt);
    }


}