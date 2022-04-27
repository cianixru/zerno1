import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Company } from '.';

@Entity({ name: 'bank_details' })
export class BankDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public paymentAccount: string | null;

  @Column({ nullable: true })
  public correspondentAccount: string | null;

  @Column({ nullable: true })
  public bic: string | null;

  @Column({ select: false })
  public companyId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @ManyToOne(() => Company, (company) => company.bankDetails, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true,
  })
  public company: Company;
}
