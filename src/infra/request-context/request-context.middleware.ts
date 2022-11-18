import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { RequestContextService } from './request-context.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(
    private requestContext: RequestContextService,
    private jwtService: JwtService
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header('authorization');

      if (token) {
        this.requestContext.setToken(token);
        const jwtPayload: any = this.jwtService.decode(token.split(' ')[1]);
        this.requestContext.setUserId(jwtPayload.name);
      }
    } catch (e) {}

    next();
  }
}
