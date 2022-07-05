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
import { PasswordHelper } from 'src/common/function/PasswordHelper';
import { ResponseHelper } from 'src/common/function/ResponseHelper';
import { SendMailsService } from 'src/send-mails/send-mails.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private responseHelper = new ResponseHelper();
  private passwordHelper = new PasswordHelper();
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: SendMailsService,
  ) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async create(@Body() user: CreateUserDto) {
    const checkUserExists = await this.usersService.checkUserNameExists(
      user.username,
    );
    if (checkUserExists === false) {
      user.password = await this.passwordHelper.hashPassword(user.password);
      return this.usersService.create(user);
    } else {
      return this.responseHelper.failResponse(null, ErrorEnum.USERNAME_EXISTS);
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
