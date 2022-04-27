import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Permission } from '.';

@Entity({ name: 'objects' })
export class Obj extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index('index_zerno_agregator_objects__name')
  @Column({ unique: true })
  public name: string;

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

  @OneToMany(() => Permission, (permission) => permission.obj)
  public permissions: Permission[];
}
