import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo, IsEmail, Unique } from 'sequelize-typescript';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Phase } from './phase.model';
import { type } from 'os';

@ObjectType({ description: 'task' })
@Table({ tableName: 'tasks', createdAt: false, updatedAt: false })
export class Task extends Model {
  @Field(type => ID)
  @PrimaryKey
  @Column({
      type: DataType.UUID,
      allowNull: false,
      defaultValue: DataType.UUIDV4
  })
  id: string;

  @Field({ nullable: false })
  @Column({
    type: DataType.STRING,
    allowNull: false,
})
  title: string;

  @Field({ nullable: false })
  @Unique
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
})
  order: number;

  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
})
  description: string;

  @Field({ nullable: false })
  @ForeignKey(() => Phase)
  @Column({
    type: DataType.STRING,
    allowNull: false,
})
  phaseId: string;

  @Field(type => Phase)
  @BelongsTo(() => Phase)
  phase: Phase

  @Field()
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: new Date()
})  
  createdAt: Date; 
  
  @Field()
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: new Date()
})  
  updatedAt: Date; 

}
