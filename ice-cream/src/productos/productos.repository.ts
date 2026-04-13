import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductoDto) {
    return this.prisma.producto.create({
      data: {
        nombre: data.nombre,
        tipo: data.tipo,
        precio: data.precio,
        disponible: data.disponible ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.producto.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findByType(tipo: string) {
    return this.prisma.producto.findMany({
      where: { tipo, disponible: true },
    });
  }

  async findById(id: number) {
    return this.prisma.producto.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateProductoDto) {
    return this.prisma.producto.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.producto.delete({ where: { id } });
  }
}
