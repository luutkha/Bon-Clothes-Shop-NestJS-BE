import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { NumberHelper } from 'src/common/function/NumberHelper';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private readonly numberHelper = new NumberHelper();

  //   @Cron('* * * * * *')
  @Interval(1000)
  handleCron() {
    // this.logger.debug(
    //   'Every 100 seconds. this func will be active. for test some func',
    // );
    // this.logger.debug(this.numberHelper.genRandomOTP())

    function rolated(arr, n) {
      console.log(arr[1]);
      console.log(n);
      if (n === 0) return arr;
      else {
        if (n < 0) {
          for (let i = 0; i < n; i++) {
            console.log('n<0');
            for (let j = 0; j < arr.length; j++) {
              console.log(arr[j]);
              if (j !== arr.length - 1) {
                arr[j] = arr[j + 1];
              } else {
                console.log(arr[j]);
                arr[0] = arr[arr.length - 1];
              }
            }
          }
        } else {
          console.log('n>0');
        }
      }
      return arr;
    }

    console.log(rolated([1, 2, 3, 4, 5], -1));
  }
}
