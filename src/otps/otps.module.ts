import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { OtpsController } from './otps.controller';
import { OtpsService } from './otps.service';

@Module({
  controllers: [OtpsController],
  providers: [OtpsService],
  imports: [TypeOrmModule.forFeature([Otp])],
  exports: [OtpsService],
})
export class OtpsModule {}
