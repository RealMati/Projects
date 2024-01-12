import { Controller, Get, Redirect, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Redirect()
  getHello(@Req() req: Request) {
    return this.appService.sendToHome(req);
  }

  @Get('/logout')
  async logout(@Res() res: Response) {
    res.cookie('accessToken', {}, { maxAge: 1 }).status(200).redirect('/auth/login')
  }
}
