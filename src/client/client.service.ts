import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

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

  async remove(id: string) {
    const client = await this.clientRepo.findOneBy({ id });

    if (!client) throw new NotFoundException();
    return await this.clientRepo.delete({ id });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepo.findOneBy({ id });

    if (!client) throw new NotFoundException();
    return await this.clientRepo.update({ id }, { ...updateClientDto });
  }
}
