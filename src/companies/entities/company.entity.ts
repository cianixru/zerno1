import {
  Entity,
  BaseEntity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CompanySigner, BankDetails, EdmOperator } from '.';
import { User } from '../../users/entities';
import { CompanyType } from '../../types';

@Entity({ name: 'companies' })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ type: 'enum', enum: CompanyType })
  public roleTypeId: CompanyType;

  @Index('index_zerno_agregator_companies__inn')
  @Column({ nullable: true, unique: true })
  public inn: string | null;

  @Column({ nullable: true })
  public kpp: string | null;

  @Column({ nullable: true })
  public okved: string | null;

  @Column('varchar', { array: true, nullable: true })
  public okveds: string[] | null;

  @Column({ nullable: true })
  public address: string | null;

  @Column()
  public nds: boolean;

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

  @ManyToOne(() => User, (user) => user.companies)
  public user: User;

  @OneToMany(() => CompanySigner, (signers) => signers.company)
  signers: CompanySigner[];

  @OneToMany(() => BankDetails, (bankDetails) => bankDetails.company)
  bankDetails: BankDetails[];

  @OneToMany(() => EdmOperator, (edmOperator) => edmOperator.company)
  edmOperator: EdmOperator;
}
