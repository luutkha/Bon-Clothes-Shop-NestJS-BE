import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubProductDto } from './dto/create-sub-product.dto';
import { UpdateSubProductDto } from './dto/update-sub-product.dto';
import { SubProduct } from './entities/sub-product.entity';

@Injectable()
export class SubProductsService {
  constructor(
    @InjectRepository(SubProduct)
    private usersRepository: Repository<SubProduct>,
  ) {}
  create(createSubProductDto: CreateSubProductDto) {
    return 'This action adds a new subProduct';
  }

  findAll() {
    return `This action returns all subProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subProduct`;
  }

  update(id: number, updateSubProductDto: UpdateSubProductDto) {
    return `This action updates a #${id} subProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} subProduct`;
  }
}
