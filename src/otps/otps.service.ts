import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpConst, OtpTypeEnum } from 'src/common/enum&constants/OtpType.enum';
import { ResponseEnum } from 'src/common/enum&constants/ResponseEnum';
import { ResponseHelper } from 'src/common/function/ResponseHelper';
import { TimeHelper } from 'src/common/function/TimeHelper';
import { UsersService } from 'src/users/users.service';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { VerifyOtpDTO } from './dto/verify-otp.dto';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpsService {
  private timeHelper = new TimeHelper();
  private responseHelper = new ResponseHelper();
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    private userService: UsersService,
  ) {}
  async saveNewOTPtoDB(otp: Otp) {
    otp.isActive = true;
    return await this.otpRepository.save(otp);
  }

  async verifyOtp(verifyOtp: VerifyOtpDTO) {
    const now = this.timeHelper.getNow();
    const otpExpireExpected = this.timeHelper.addMinus(
      now.toDate(),
      -OtpConst.MINUS_EXPIRE_OTP,
    );
    const user = await this.userService.findOne(verifyOtp.username);

    if (!user)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Username not exists!',
        },
        HttpStatus.NOT_FOUND,
      );
    const otps: Otp[] = await this.otpRepository.find({
      where: {
        otp: verifyOtp.otp,
        user: {
          username: user.username,
        },
        isActive: true,
        type: verifyOtp.type,
        createdDate: MoreThanOrEqual(new Date(otpExpireExpected)),
      },
      take: 1,
      // relations: ['user'],
      order: {
        createdDate: 'DESC',
      },
    });
    if (otps.length < 1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Otp not exists!',
        },
        HttpStatus.NOT_FOUND,
      );
    } else {
      otps[0].isActive = false;
      await this.otpRepository.update({ id: otps[0].id }, { isActive: false });
    }
    return this.responseHelper.successResponse({
      message: ResponseEnum.VERIFY_OTP_SUCCESS,
    });
  }
}
