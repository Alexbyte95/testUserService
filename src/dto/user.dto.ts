import { IsEmail, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserRequest {
  @IsString()
  @ApiProperty({ description: 'Name' })
  name: string;

  @IsEmail()
  @ApiProperty({ description: 'Email' })
  email: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ description: 'Age' })
  age: number;
}

export class GetUserRequest {
  @ApiProperty({ description: 'ID' })
  id: string;

  @ApiProperty({ description: 'Name' })
  name: string;

  @ApiProperty({ description: 'Email' })
  email: string;

  @ApiProperty({ description: 'Age' })
  age: number;
}
