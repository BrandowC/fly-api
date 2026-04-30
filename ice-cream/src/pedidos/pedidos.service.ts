import { Injectable } from '@nestjs/common';
import { PedidosRepository } from './pedidos.repository';
import { ProductosService } from '../productos/productos.service';
import { ToppingsService } from '../topping/topping.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    private readonly repository: PedidosRepository,
    private readonly productosService: ProductosService,
    private readonly toppingsService: ToppingsService,
  ) {}

  async crearPedido(dto: CreatePedidoDto) {
    let totalGeneral = 0;
    const detallesParaGuardar: any[] = [];

    for (const item of dto.items) {
      const producto = await this.productosService.findOne(item.productoId);
      const topping = item.toppingId
        ? await this.toppingsService.findOne(item.toppingId)
        : null;

      const precioProducto = Number(producto.precio);
      const precioTopping = topping ? Number(topping.precio) : 0;
      const subtotal = precioProducto + precioTopping;

      totalGeneral += subtotal;

      detallesParaGuardar.push({
        productoId: item.productoId,
        toppingId: item.toppingId,
        subtotal: subtotal,
      });
    }

    const nuevoPedido = await this.repository.createPedido(
      {
        clienteNombre: dto.clienteNombre,
        telefono: dto.telefono,
        direccion: dto.direccion,
        total: totalGeneral,
      },
      detallesParaGuardar,
    );

    const whatsappUrl = this.generarLinkWhatsApp(nuevoPedido);

    return {
      message: 'Pedido creado con éxito',
      whatsappUrl,
      pedido: nuevoPedido,
    };
  }

  // ESTE ES EL MÉTODO QUE TE FALTABA
  async findAll() {
    return await this.repository.findAll();
  }

  async toggleCompletado(id: number) {
    return await this.repository.toggleCompletado(id);
  }

  private generarLinkWhatsApp(pedido: any): string {
    const numeroTienda = '573XXXXXXXXX'; // Cambia esto por tu número real
    let texto = `*¡Nuevo Pedido de Helado!*%0A%0A`;
    texto += `*Cliente:* ${pedido.clienteNombre}%0A`;
    texto += `*Dirección:* ${pedido.direccion}%0A`;
    texto += `*Teléfono:* ${pedido.telefono}%0A%0A`;
    texto += `*Productos:*%0A`;

    pedido.detalles.forEach((d: any) => {
      texto += `- ${d.producto.nombre} ${d.topping ? '(Topping: ' + d.topping.nombre + ')' : ''}%0A`;
    });

    texto += `%0A*Total a pagar: $${pedido.total}*`;

    return `https://wa.me/${numeroTienda}?text=${texto}`;
  }
}
