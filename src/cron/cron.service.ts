import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { NumberHelper } from 'src/common/function/NumberHelper';
import { TimeHelper } from 'src/common/function/TimeHelper';
import { OtpsService } from 'src/otps/otps.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private readonly numberHelper = new NumberHelper();
  private readonly timeHelper = new TimeHelper();
  constructor(private otpService: OtpsService) {}

  @Cron('0 */30 9-20 * * *')
  // @Interval(1000)
  handleCron() {
    this.logger.debug(
      'Every 30 minus in 9AM -> 20PM. this func will be active. for test some func',
    );
    // this.logger.debug(this.numberHelper.genRandomOTP());
    this.logger.debug(this.timeHelper.getNow());
  }

  @Cron('0 */30 9-20 * * *')
  async cleanDatabase() {
    this.logger.debug(
      'Every 30 minus in 9:00AM -> 8:00PM. this func will be clean database',
    );
    await this.otpService.cleanOTPTable();
  }
}
