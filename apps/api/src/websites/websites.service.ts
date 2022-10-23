import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class WebsitesService {
  constructor(
    private readonly logger: LoggerService = new Logger(WebsitesService.name)
  ) {}

  // Just an example from some other project. TODO: remove if not needed
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Called when the current second is 10');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }

  create(createWebsiteDto: CreateWebsiteDto) {
    this.logger.debug(createWebsiteDto.toString());
    return 'This action adds a new website';
  }

  findAll() {
    return `This action returns all websites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} website`;
  }

  update(id: number, updateWebsiteDto: UpdateWebsiteDto) {
    this.logger.debug(updateWebsiteDto.toString());
    return `This action updates a #${id} website`;
  }

  remove(id: number) {
    return `This action removes a #${id} website`;
  }
}
