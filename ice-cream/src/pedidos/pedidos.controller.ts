import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  // Ruta para que el cliente cree su pedido desde la App
  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto) {
    return await this.pedidosService.crearPedido(createPedidoDto);
  }

  // Ruta para que el Admin vea todos los pedidos
  @Get()
  async findAll() {
    return await this.pedidosService.findAll();
  }

  // Ruta extra por si el Admin quiere ver un pedido específico por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // Nota: Deberás implementar findOne en tu service si decides usar esto
    return { message: `Buscando pedido con ID ${id}` };
  }
}
