import { Body, Controller, Get, HttpStatus, Post, Render, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { join } from 'path';
import { AdminSignUpDto } from './dto/signup-admin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Get('/login')
    @Render("login")
    getLoginPage() { }

    @Get('/signup')
    @Render("signup")
    getSignupPage() { }

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
    }

    @Get('/admin/login')
    @Render("adminLogin")
    getAdminLoginPage() {
        return {}
    }

    @Get('/admin/signup')
    @Render("adminSignup")
    getAdminSignupPage() {
        return {}
    }

    @Post('/admin/signup')
    adminSignUp(@Body() reqBody: AdminSignUpDto): Promise<{ token: string }> {
        return this.authService.adminSignUp(reqBody)
    }

    @Post('/admin/login')
    async adminLogIn(@Body() reqBody: LogInDto, @Res() res: Response) {
        const { token } = await this.authService.adminLogIn(reqBody)
        console.log(token)
        if (token) {
            res.cookie('accessToken', token, { httpOnly: true, maxAge: 24 * 3600 * 1000 }).sendStatus(200)
        } else {
            res.cookie('accessToken', "", { maxAge: 1 }).sendStatus(409)
        }
        return
    }
}