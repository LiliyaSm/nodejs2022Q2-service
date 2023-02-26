import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() token) {
    return this.authService.refresh(token);
  }
}
