import { Table, Column, Model, DataType, PrimaryKey, IsEmail, Unique } from 'sequelize-typescript';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'company' })
@Table({ tableName: 'companies', createdAt: false, updatedAt: false })
export class Company extends Model {
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
  name: string;

  @Field({ nullable: false })
  @IsEmail
  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
})
  email: string;

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