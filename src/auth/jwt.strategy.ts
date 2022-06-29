import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    console.log('catch');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret_key',
    });
  }

  async validate(user: User) {
    this.logger.debug('Start JWT validate');
    const { password, ...result } = user;
    this.logger.log(JSON.stringify(user));
    // if (user.isDeteled === false) {
    //   this.logger.error('End validate JWT with error!');
    //   throw new UnauthorizedException(
    //     'User does not exist',
    //     'DELETED_USER_ERROR',
    //   );
    // }
    this.logger.debug('End JWT validate');

    return result;
  }
}
