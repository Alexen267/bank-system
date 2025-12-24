import { Account } from 'src/account/entities/account.entity';
import { Log } from 'src/log/entities/log.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 125 })
  firstName: string;

  @Column({ length: 125 })
  lastName: string;

  @Index({ unique: true })
  @Column({ length: 150 })
  username: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Index({ unique: true })
  @Column({ length: 16 })
  tin: string;

  @Index({ unique: true })
  @Column({ length: 255 })
  email: string;

  @Index({ unique: true })
  @Column({ length: 32 })
  phone: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;

  @OneToMany(() => Log, (log) => log.client, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  logs: Log[];

  @CreateDateColumn()
  createdAt: Date;
}
