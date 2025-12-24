import { Client } from 'src/client/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string;

  @Column({ nullable: true })
  details: string;

  @ManyToOne(() => Client, (client) => client.logs, { onDelete: 'SET NULL' })
  client: Client;

  @CreateDateColumn()
  createdAt: Date;
}
