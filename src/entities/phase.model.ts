import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo, IsEmail, Unique, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'phase' })
@Table({ tableName: 'phases', createdAt: false, updatedAt: false })
export class Phase extends Model {
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

