import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { ProductService } from './product.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto)
  }

  @Get()
  findAll() {
    return this.productService.findAll()
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id)
  }
}