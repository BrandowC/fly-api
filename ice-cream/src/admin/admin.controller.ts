import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiKeyGuard } from './guards/api-key.guard';

@Controller('admin')
@UseGuards(ApiKeyGuard) // Protege todas las rutas de este controlador
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  getStats() {
    return this.adminService.getDashboard();
  }

  @Get('reporte-pedidos')
  getReporte(@Query('inicio') inicio: string, @Query('fin') fin: string) {
    return this.adminService.getPedidosRecientes(inicio, fin);
  }
}
