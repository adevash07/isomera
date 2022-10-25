import { Body, Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private health: HealthCheckService,
    private orm: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/echo')
  getEcho(@Req() req, @Res() res, @Body() body) {
    res.status(200).json(body);
  }

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.orm.pingCheck('db'),
      () => this.memory.checkRSS('mem_rss', 768 * 2 ** 20 /* 768 MB */),
    ]);
  }
}
