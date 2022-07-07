import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ErrorEnum } from 'src/common/enum&constants/ErrorCode';
import { OtpTypeEnum } from 'src/common/enum&constants/OtpType.enum';
import { NumberHelper } from 'src/common/function/NumberHelper';
import { PasswordHelper } from 'src/common/function/PasswordHelper';
import { ResponseHelper } from 'src/common/function/ResponseHelper';
import { Otp } from 'src/otps/entities/otp.entity';
import { OtpsService } from 'src/otps/otps.service';
import { SendMailsService } from 'src/send-mails/send-mails.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private responseHelper = new ResponseHelper();
  private passwordHelper = new PasswordHelper();
  private numberHelper = new NumberHelper();

  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: SendMailsService,
    private readonly otpService: OtpsService,
  ) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async create(@Body() user: CreateUserDto) {
    const checkUserExists = await this.usersService.checkUserNameExists(
      user.username,
    );
    if (checkUserExists === false) {
      user.password = await this.passwordHelper.hashPassword(user.password);
      const finalUser = await this.usersService.create(user);
      const otp = this.numberHelper.genRandomOTP();
      const createOtpDto = new Otp();
      createOtpDto.otp = otp;
      createOtpDto.type = OtpTypeEnum.REGISTER;
      createOtpDto.user = finalUser;
      this.otpService.saveNewOTPtoDB(createOtpDto);
      if (
        !this.mailService.sendMailWithOTP(user.email, otp, OtpTypeEnum.REGISTER)
      ) {
        return this.responseHelper.failResponse({}, ErrorEnum.SEND_MAIL_ERROR);
      }
      return this.responseHelper.successResponse(finalUser);
    } else {
      return this.responseHelper.failResponse({}, ErrorEnum.USERNAME_EXISTS);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get('/profile/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    console.log('call get proile detail');
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
