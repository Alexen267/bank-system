import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Account } from 'src/account/entities/account.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'very_goofy_256_secret',
      signOptions: {
        expiresIn: '45m',
      },
    }),
    TypeOrmModule.forFeature([Client, Account]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
