import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { ProductosService } from '../productos/productos.service';
import { ToppingsService } from '../topping/topping.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly productosService: ProductosService,
    private readonly toppingsService: ToppingsService,
  ) {}

  async getDashboard() {
    return this.adminRepo.getDashboardStats();
  }

  async getPedidosRecientes(inicio?: string, fin?: string) {
    if (inicio && fin) {
      return this.adminRepo.getPedidosPorFecha(new Date(inicio), new Date(fin));
    }
    // Si no hay fechas, devolvemos todo lo que el repo de admin decida
    return this.adminRepo.getPedidosPorFecha(
      new Date('2024-01-01'),
      new Date(),
    );
  }
}
