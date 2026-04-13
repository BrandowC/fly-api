import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { ProductosRepository } from './productos.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService, ProductosRepository, PrismaService],
  exports: [ProductosService], // Lo exportamos para usarlo luego en Pedidos
})
export class ProductosModule {}
