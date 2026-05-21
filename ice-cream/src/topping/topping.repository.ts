import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';

@Injectable()
export class ToppingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateToppingDto) {
    return this.prisma.topping.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        imagenUrl: data.imagenUrl,
        disponible: data.disponible ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.topping.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findAvailable() {
    return this.prisma.topping.findMany({
      where: {
        disponible: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findById(id: number) {
    return this.prisma.topping.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateToppingDto) {
    return this.prisma.topping.update({
      where: { id },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        imagenUrl: data.imagenUrl,
        disponible: data.disponible,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.topping.delete({
      where: { id },
    });
  }
}
