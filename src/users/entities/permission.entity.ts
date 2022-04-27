export interface PermissionCondition {}
import {
  Entity,
  BaseEntity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Obj } from '.';
import { PermissionAction } from '../../types';

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'enum', enum: PermissionAction })
  public action: PermissionAction;

  @Column('json', { nullable: true })
  public condition: object;

  @Column()
  public objId: number;

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

  // @OneToMany(() => User, (user) => user.role)
  // public users: User[];

  @ManyToOne(() => Obj, (obj) => obj.permissions)
  public obj: Obj;

  public static parseCondition(
    condition: PermissionCondition,
    variables: Record<string, any>,
  ): PermissionCondition {
    if (!condition) return null;
    const parsedCondition = {};
    for (const [key, rawValue] of Object.entries(condition)) {
      if (rawValue !== null && typeof rawValue === 'object') {
        const value = this.parseCondition(rawValue, variables);
        parsedCondition[key] = value;
        continue;
      }
      if (typeof rawValue !== 'string') {
        parsedCondition[key] = rawValue;
        continue;
      }
      // find placeholder "${}""
      const matches = /^\${([a-zA-Z0-9]+)}$/.exec(rawValue);
      if (!matches) {
        parsedCondition[key] = rawValue;
        continue;
      }

      const value = variables[matches[1]];
      if (typeof value === 'undefined') {
        throw new ReferenceError(`Variable ${name} is not defined`);
      }
      parsedCondition[key] = value;
    }
    return parsedCondition;
  }
}
