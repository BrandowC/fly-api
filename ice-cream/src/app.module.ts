import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { AdminModule } from './admin/admin.module';
import { ToppingsModule } from './topping/topping.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductosModule, PedidosModule, AdminModule, ToppingsModule, AuthModule],
})
export class AppModule {}
