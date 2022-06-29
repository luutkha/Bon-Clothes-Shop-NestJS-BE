import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  //   @Cron('* * * * * *')
  @Interval(100000)
  handleCron() {
    this.logger.debug('Every 100 seconds. this func will be active');
  }
}
