import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsInt } from 'class-validator'

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNumber()
  price: number

  @ApiProperty()
  @IsInt()
  quantity: number
}