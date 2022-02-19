import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

import { appConfig } from 'src/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, AuthModule, MongooseModule.forRoot(appConfig.MONGO_URL), AuthModule, JwtModule.register({
    secret: appConfig.JWT_TOKEN_SECRET,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
