import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        port: configService.getOrThrow('MYSQL_PORT'),
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE') === 'true',
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
