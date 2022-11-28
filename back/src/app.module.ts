import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';
import { PlannerModule } from './planner/planner.module';
import { JwtModule } from '@nestjs/jwt';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'wouldu',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      timezone: 'Asia/Seoul',
      // synchronize: true,
      ssl: { rejectUnauthorized: true },
    }),
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '6000s',
      },
    }),
    DiaryModule,
    PlannerModule,
    FriendModule,
  ],
})
export class AppModule {}
