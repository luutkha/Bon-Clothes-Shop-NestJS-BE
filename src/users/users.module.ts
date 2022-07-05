import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SendMailsModule } from 'src/send-mails/send-mails.module';
import { OtpsModule } from 'src/otps/otps.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SendMailsModule, OtpsModule],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
