import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  private readonly logger = new Logger(PasswordHelper.name);

  async hashPassword(password) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
  async isPasswordMatch(password, hash) {
    this.logger.log('start compare password and hash');
    const check = await bcrypt.compare(password, hash);
    this.logger.log('Compare password and hash complete');
    return check;
  }
}
