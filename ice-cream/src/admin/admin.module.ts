import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { ProductosModule } from '../productos/productos.module';
import { ToppingsModule } from '../topping/topping.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ProductosModule, ToppingsModule], // Reutilizamos lógica existente
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PrismaService],
})
export class AdminModule {}
