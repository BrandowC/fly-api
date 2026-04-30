import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductosRepository } from './productos.repository';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(private readonly repository: ProductosRepository) {}

  create(dto: CreateProductoDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const producto = await this.repository.findById(id);
    if (!producto) throw new NotFoundException(`Producto ${id} no encontrado`);
    return producto;
  }

  // Útil para la pantalla de "Armar Helado" en Expo Go
  findByType(tipo: string) {
    return this.repository.findByType(tipo);
  }

  async update(id: number, dto: UpdateProductoDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
