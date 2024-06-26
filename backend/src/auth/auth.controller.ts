import { Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('User in login request:', req.user); // Add this line for debugging
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getCurrentUser(@Request() req) {
    return req.user;
  }
}
