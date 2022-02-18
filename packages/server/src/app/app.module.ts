import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

import { appConfig } from 'src/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule, MongooseModule.forRoot(appConfig.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
