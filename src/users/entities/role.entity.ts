import {
  Entity,
  BaseEntity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from '.';
import { User } from '../../users/entities';
// import { CompanyType } from '../../types';
import { Roles } from '../../types';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  public name: Roles;

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

  @OneToMany(() => User, (user) => user.role)
  public users: User[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
