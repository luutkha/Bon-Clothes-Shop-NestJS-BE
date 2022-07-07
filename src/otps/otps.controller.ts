import { Body, Controller, Post } from '@nestjs/common';
import { VerifyOtpDTO } from './dto/verify-otp.dto';
import { OtpsService } from './otps.service';

@Controller('otps')
export class OtpsController {
  constructor(private readonly otpsService: OtpsService) {}

  @Post('/verify')
  verifyOtp(@Body() verifyOtp: VerifyOtpDTO) {
    return this.otpsService.verifyOtp(verifyOtp);
  }
}
