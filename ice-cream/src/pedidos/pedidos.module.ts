import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { ProductosModule } from '../productos/productos.module';
import { ToppingsModule } from '../topping/topping.module';
import { PedidosRepository } from './pedidos.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ProductosModule, ToppingsModule], // Importante para inyectar los servicios
  controllers: [PedidosController],
  providers: [PedidosService, PedidosRepository, PrismaService],
})
export class PedidosModule {}
