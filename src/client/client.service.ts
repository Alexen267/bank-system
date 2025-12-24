import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  async findAll(paginationDto: PaginationDto) {
    const [data, results] = await this.clientRepo
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.account', 'account')
      .offset((paginationDto.page - 1) * paginationDto.limit)
      .limit(paginationDto.limit)
      .getManyAndCount();

    return {
      results,
      page: paginationDto.page,
      data,
    };
  }

  async findOne(id: string) {
    const result = await this.clientRepo.findOneBy({ id });

    if (!result) throw new NotFoundException();
    return result;
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: string) {
    return `This action removes a #${id} client`;
  }
}
