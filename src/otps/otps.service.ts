import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeHelper } from 'src/common/function/TimeHelper';
import { UsersService } from 'src/users/users.service';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { VerifyOtpDTO } from './dto/verify-otp.dto';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpsService {
  private timeHelper = new TimeHelper();
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    private userService: UsersService,
  ) {}
  async saveNewOTPtoDB(otp: Otp) {
    otp.isActive = true;
    return await this.otpRepository.save(otp);
  }

  // TODO: create expire_date in otp entity
  async verifyOtp(verifyOtp: VerifyOtpDTO) {
    const now = this.timeHelper.getNow();
    console.log(now);
    const otps: Otp[] = await this.otpRepository.find({
      where: {
        otp: verifyOtp.otp,
        user: {
          username: await (
            await this.userService.findOne(verifyOtp.username)
          ).username,
        },
        isActive: true,
        type: verifyOtp.type,
        // createdDate: MoreThanOrEqual(now),
      },
      relations: ['user'],
    });

    return { otps: otps, time: now };
  }

  checkValideOTP(otp: Otp) {
    return true;
  }
}
