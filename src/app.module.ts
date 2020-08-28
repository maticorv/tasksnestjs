import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as config from 'config';
import { GenericEntity } from './shared/entities/generic.entity';

const dbConfig = config.get('db')
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host:process.env.RDS_HOSTNAME  || dbConfig.host,
      port: process.env.RDS_PORT  || dbConfig.port,
      username: process.env.RDS_USERNAME  || dbConfig.username,
      password: process.env.RDS_PASSWORD  || dbConfig.password,
      database: process.env.RDS_DB_NAME  || dbConfig.database,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    }),
    TasksModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthModule],
})
export class AppModule {}