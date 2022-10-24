import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../enums/role.enum';

@ObjectType()
@Entity()
@Unique(['email'])
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  // @Field()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.standard,
  })
  roles: Role[];
}
