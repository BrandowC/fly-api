import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalPedidos, totalToppings, totalProductos, ventasTotales] =
      await Promise.all([
        this.prisma.pedido.count(),
        this.prisma.topping.count(),
        this.prisma.producto.count(),
        this.prisma.pedido.aggregate({ _sum: { total: true } }),
      ]);

    return {
      totalPedidos,
      totalToppings,
      totalProductos,
      ingresosTotales: ventasTotales._sum.total || 0,
    };
  }

  async getPedidosPorFecha(inicio: Date, fin: Date) {
    return this.prisma.pedido.findMany({
      where: {
        createdAt: { gte: inicio, lte: fin },
      },
      include: { detalles: { include: { producto: true, topping: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
