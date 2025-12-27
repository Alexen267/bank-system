import { Client } from 'src/client/entities/client.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  @Generated('uuid')
  accountNo: string;

  @Column({ type: 'decimal', default: 500 })
  balance: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Client, (client) => client.account)
  client: Client;

  @OneToMany(() => Transaction, (transaction) => transaction.sourceAccount)
  outgoingTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.destinationAccount)
  incomingTransactions: Transaction[];
}
