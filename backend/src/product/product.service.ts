import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }
    async create(data: CreateProductDto) {
        return this.prisma.product.create({ data })
    }

    async findAll() {
        return this.prisma.product.findMany()
    }

    async update(id: string, data: UpdateProductDto) {
        return this.prisma.product.update({
            where: { id },
            data,
        })
    }

    async remove(id: string) {
        return this.prisma.product.delete({
            where: { id },
        })
    }
}