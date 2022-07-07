import { IsNumber, IsString } from 'class-validator';

export class VerifyOtpDTO {
  @IsString()
  otp: string;
  @IsNumber()
  type: number;
  @IsString()
  username: string;
}
