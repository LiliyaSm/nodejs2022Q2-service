import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
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
  refresh() {
    return this.authService.refresh();
  }
}
