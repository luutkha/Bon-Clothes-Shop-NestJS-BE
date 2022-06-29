import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
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
      return true;
    } else {
      return false;
    }
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
