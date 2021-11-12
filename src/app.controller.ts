import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth-gaurd';
import { UserDto } from './team/dto/user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UsersService
  ) { }

  //Route to perform health check
  @Get('healthCheck')
  getHealth(): string {
    return this.appService.getHealth();
  }
  //Route to fetch login token
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() bdy:UserDto,@Request() req) {
    return this.authService.login(req.user);
  }
  //Route to fetch logged-in user info
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  //Route to register new user
  @Post('signup')
  async register(@Body() bdy:UserDto,@Request() req) {
    return this.userService.registerUser(req.body);
  }
}
