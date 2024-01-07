import { Body, Controller, Get, HttpStatus, Post, Render, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { join } from 'path';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Get('/login')
    @Render("login")
    getLoginPage() {
        return {}
    }

    @Get('/signup')
    @Render("signup")
    getSignupPage() {
        return {}
    }

    @Post('/signup')
    signUp(@Body() reqBody: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(reqBody)
    }

    @Post('/login')
    async logIn(@Body() reqBody: LogInDto, @Res() res: Response) {
        const { token } = await this.authService.logIn(reqBody)
        console.log(token)
        if (token) {
            res.cookie('accessToken', token, { httpOnly: true, maxAge: 24 * 3600 * 1000 }).sendStatus(200)
        } else {
            res.cookie('accessToken', "", { maxAge: 1 }).sendStatus(409)
        }
        return
    }
}
