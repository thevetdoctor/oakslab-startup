import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  IsEmail,
  Unique,
} from 'sequelize-typescript';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Company } from './company.model';
import { Phase } from './phase.model';
import { Task } from './task.model';

@ObjectType({ description: 'companytask' })
@Table({ tableName: 'companytasks', createdAt: false, updatedAt: false })
export class CompanyTask extends Model {
  @Field((type) => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field({ nullable: false })
  @ForeignKey(() => Company)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  companyId: string;

  @BelongsTo(() => Company)
  Company: Company;

  @Field({ nullable: false })
  @ForeignKey(() => Phase)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phaseId: string;

  @BelongsTo(() => Phase)
  Phase: Phase;

  @Field({ nullable: false })
  @ForeignKey(() => Task)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  taskId: string;

  @BelongsTo(() => Task)
  Task: Task;

  @Field({ nullable: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  active: boolean;

  @Field({ nullable: false })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'pending',
  })
  status: string;

  @Field()
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: new Date(),
  })
  createdAt: Date;

  @Field()
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: new Date(),
  })
  updatedAt: Date;
}
