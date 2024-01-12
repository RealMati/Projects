// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Check if the cookie exists
        const accessToken = req.cookies['accessToken'];

        if (!accessToken) {
            // If the cookie doesn't exist, redirect to the login page
            return res.redirect('/auth/login');
        }
        // If the cookie exists, proceed to the next middleware or route handler
        next();
    }
     }
