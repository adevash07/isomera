import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
