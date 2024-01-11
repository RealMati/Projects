import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sendToHome(req): { url: string } {
    if (req.cookies.accessToken) {
      return { url: '/albums' };
    } else {
      return { url: '/auth/login' }
    }
  }
}