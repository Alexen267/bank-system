import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Account])],
  controllers: [ClientController],
  providers: [ClientService, JwtService],
})
export class ClientModule {}
