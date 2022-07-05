import { Module } from '@nestjs/common';
import { OtpsService } from './otps.service';
import { OtpsController } from './otps.controller';
import { Otp } from './entities/otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [OtpsController],
  providers: [OtpsService],
  imports: [TypeOrmModule.forFeature([Otp])],
  exports: [OtpsService],
})
export class OtpsModule {}
