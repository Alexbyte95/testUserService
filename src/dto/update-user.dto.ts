/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  age?: number;
}
