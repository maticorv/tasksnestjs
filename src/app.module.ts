import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'taskmanager',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
