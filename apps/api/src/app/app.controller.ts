import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { RolesGuard } from '../auth/strategy/roles.guard';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../custom.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/health-check')
  healthCheck() {
    return this.appService.healthCheck();
  }

  @Get('/echo')
  getEcho(@Req() req, @Res() res, @Body() body) {
    res.status(200).json(body);
  }

  @Get('/premium-echo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.premium)
  getPremiumEcho(@Req() req, @Res() res, @Body() body) {
    res.status(200).json(body);
  }
}
