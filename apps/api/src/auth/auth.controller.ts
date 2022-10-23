import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: AuthLoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return await this.authService.register(authRegisterDto);
  }
}
