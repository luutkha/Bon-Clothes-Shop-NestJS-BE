import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  //   @Cron('* * * * * *')
  @Interval(2000)
  handleCron() {
    this.logger.debug('Every 10 seconds. this func will be active');
  }
}
