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
import { ResponseHelper } from 'src/common/function/ResponseHelper';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private responseHelper = new ResponseHelper();

  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  create(@Body() user: User) {
    const checkUserExists = this.usersService.checkUserNameExists(
      user.username,
    );
    if (!checkUserExists) return this.usersService.create(user);
    else {
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
