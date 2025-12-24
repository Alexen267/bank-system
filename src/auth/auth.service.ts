import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { Account } from 'src/account/entities/account.entity';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const match = await this.clientRepo.findOne({
      where: [
        { email: signUpDto.email },
        { tin: signUpDto.tin },
        { phone: signUpDto.phone },
        { username: signUpDto.username },
      ],
    });

    console.log(match);
    if (match) throw new BadRequestException('Account already exists');

    const password = await bcrypt.hash(signUpDto.password, 12);
    const account: CreateAccountDto = this.accountRepo.create();
    await this.accountRepo.save(account);
    const client = this.clientRepo.create({ ...signUpDto, account, password });

    await this.clientRepo.save(client);
    return {
      token: this.jwtService.sign({ sub: client.id, email: client.email }),
    };
  }

  async login(loginDto: LoginDto) {
    const foundClient = await this.clientRepo
      .createQueryBuilder('client')
      .where('client.email = :email', { email: loginDto.email })
      .addSelect('client.password')
      .getOne();

    if (!foundClient)
      throw new UnauthorizedException('Invalid email or password');

    const isMatch = await bcrypt.compare(
      loginDto.password,
      foundClient.password,
    );
    if (!isMatch) throw new UnauthorizedException('Invalid email or password');
    const { password, ...client } = foundClient;
    return {
      token: this.jwtService.sign({
        sub: client.id,
        email: client.email,
      }),
    };
  }
}
