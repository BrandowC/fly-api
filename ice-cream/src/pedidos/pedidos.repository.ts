import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PedidosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPedido(data: any, detalles: any[]) {
    return this.prisma.pedido.create({
      data: {
        ...data,
        detalles: {
          create: detalles,
        },
      },
      include: { detalles: { include: { producto: true, topping: true } } },
    });
  }

  async findAll() {
    return this.prisma.pedido.findMany({
      include: { detalles: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
