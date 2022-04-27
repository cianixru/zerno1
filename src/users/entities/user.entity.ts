import {
  Entity,
  BaseEntity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Company } from '../../companies/entities';
import { Role } from '.';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index('index_zerno_agregator_users__phone_number')
  @Column({ unique: true })
  public phoneNumber: string;

  @Column({ nullable: true }) //TODO: select: false
  public secret: string;

  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true })
  public patronymic: string | null;

  @Column({ nullable: true })
  public surname: string | null;

  @Column({ nullable: true })
  public email: string | null;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ nullable: true })
  public companyId: number | null;

  @Column({ nullable: true })
  public roleId: number | null;

  @Column({ nullable: true, select: false })
  public refreshToken: string;

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

  @OneToMany(() => Company, (company) => company.user)
  public companies: Company[];

  @ManyToOne(() => Role, (role) => role.users)
  public role: Role;
}
