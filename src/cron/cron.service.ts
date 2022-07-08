import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { NumberHelper } from 'src/common/function/NumberHelper';
import { TimeHelper } from 'src/common/function/TimeHelper';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private readonly numberHelper = new NumberHelper();
  private readonly timeHelper = new TimeHelper();

  //   @Cron('* * * * * *')
  // @Interval(1000)
  handleCron() {
    this.logger.debug(
      'Every 100 seconds. this func will be active. for test some func',
    );
    // this.logger.debug(this.numberHelper.genRandomOTP());
    this.logger.debug(this.timeHelper.getNow());
  }
}
