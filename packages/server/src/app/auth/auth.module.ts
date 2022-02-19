import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';  
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { appConfig } from 'src/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: appConfig.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
    }
  ],
  exports: [AuthService]
})
export class AuthModule {}
