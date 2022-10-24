import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email for logging in', type: () => String })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password for logging in', type: () => String })
  public password: string;
}
