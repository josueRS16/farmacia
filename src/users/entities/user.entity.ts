import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @ApiProperty({ description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn()
  userId: number;

  @ApiProperty({ description: 'Email of the user' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Hashed password of the user' })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ description: 'Role of the user' })
  @Column({ default: 'external_user' })
  role: string;

  @ApiProperty({ description: 'Verification code for password reset', nullable: true })
  @Column({ nullable: true })
  @Exclude()
  resetCode: string | null;
}