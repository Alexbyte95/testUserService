/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Name', required: false })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: 'User email', required: false })
  email?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'Age', required: false })
  age?: number;
}
