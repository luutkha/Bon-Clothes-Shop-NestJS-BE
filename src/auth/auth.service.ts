import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorEnum } from 'src/common/enum&constants/ErrorCode';
import { PasswordHelper } from 'src/common/function/PasswordHelper';
import { ResponseHelper } from 'src/common/function/ResponseHelper';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private passwordHelper = new PasswordHelper();
  private responseHelper = new ResponseHelper();
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findOne(username);
    if (user) {
      if (user.isActive) {
        if (await this.passwordHelper.isPasswordMatch(pass, user.password)) {
          const { password, ...result } = user;

          return result;
        } else {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'Password incorrect!',
            },
            HttpStatus.FORBIDDEN,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Account is not active!',
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }
    return null;
  }

  async login(user: LoginDTO) {
    this.logger.log('Start login');
    const userDetail: User = await this.validateUser(
      user.username,
      user.password,
    );
    this.logger.log('End login');
    if (userDetail)
      return {
        access_token: this.jwtService.sign(userDetail),
      };
    else {
      return this.responseHelper.failResponse({}, ErrorEnum.USERNAME_EXISTS);
    }
  }
}
