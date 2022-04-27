import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Crop } from '../../crops/entities';

@Entity({ name: 'crop_parameters' })
export class CropParameter extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public cropId: number;

  @Column()
  public name: string;

  @Column()
  public value: string;

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

  @ManyToOne(() => Crop, (crop) => crop.parameters)
  crop: Crop;
}
