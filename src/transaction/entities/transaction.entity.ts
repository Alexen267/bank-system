import { Account } from 'src/account/entities/account.entity';
import { TransactionType } from 'src/common/enum/transactionEnum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TransactionType })
  transactionType: TransactionType;

  @Column('decimal')
  amount: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  transactionDate: Date;

  @ManyToOne(() => Account, (account) => account.outgoingTransactions, {
    nullable: false,
  })
  sourceAccount: Account;

  @ManyToOne(() => Account, (account) => account.incomingTransactions, {
    nullable: true,
  })
  destinationAccount: Account;
}
