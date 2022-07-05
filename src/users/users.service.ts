import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NumberHelper } from 'src/common/function/NumberHelper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly numberHelper = new NumberHelper();
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    // const otp
    return await this.usersRepository.save(user);
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username: id },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async checkUserNameExists(userName: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { username: userName },
    });

    if (user) {
      this.logger.error(`user with username: ${userName} exists`);
      return true;
    } else {
      this.logger.log('user NOT exists');
      return false;
    }
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
