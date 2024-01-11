import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Redirect()
  getHello(@Req() req: Request) {
    return this.appService.sendToHome(req);
  }
}
