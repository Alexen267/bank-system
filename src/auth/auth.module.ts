import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Account } from 'src/account/entities/account.entity';
import { AuthGuard } from './guards/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    ClientModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '45m' },
        global: true,
      }),
    }),
    TypeOrmModule.forFeature([Client, Account]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule, AuthGuard],
})
export class AuthModule {}
