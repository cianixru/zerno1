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

@Entity({ name: 'edm_operator' })
export class EdmOperator extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public name: string | null;

  @Column({ nullable: true })
  public edmId: string | null;

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

  @ManyToOne(() => Company, (company) => company.edmOperator, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true,
  })
  public company: Company;
}
