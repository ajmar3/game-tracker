
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_ADMIN_KEY, IS_PUBLIC_KEY } from './auth.decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
    ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(isAdmin){
      const req = context.switchToHttp().getRequest()
      console.log(req.get("Authorization"))
      const header: string = req.get("Authorization")
      const token = header.split(" ")[1]
      const payload = this.jwtService.verify(token);
      console.log("payload", payload)
    }

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
