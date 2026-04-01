import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { AdminModule } from './admin/admin.module';
import { ToppingModule } from './topping/topping.module';

@Module({
  imports: [ProductosModule, PedidosModule, AdminModule, ToppingModule],
})
export class AppModule {}
