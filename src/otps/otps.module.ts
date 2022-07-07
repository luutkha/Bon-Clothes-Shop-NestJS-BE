import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Otp } from './entities/otp.entity';
import { OtpsController } from './otps.controller';
import { OtpsService } from './otps.service';

@Module({
  controllers: [OtpsController],
  providers: [OtpsService],
  imports: [TypeOrmModule.forFeature([Otp]), forwardRef(() => UsersModule)],
  exports: [OtpsService],
})
export class OtpsModule {}
