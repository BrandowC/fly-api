import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';
import { ToppingsRepository } from './topping.repository';

@Injectable()
export class ToppingsService {
  constructor(private readonly toppingsRepository: ToppingsRepository) {}

  async create(createToppingDto: CreateToppingDto) {
    return this.toppingsRepository.create(createToppingDto);
  }

  async findAll() {
    return this.toppingsRepository.findAll();
  }

  async findAvailable() {
    return this.toppingsRepository.findAvailable();
  }

  async findOne(id: number) {
    const topping = await this.toppingsRepository.findById(id);

    if (!topping) {
      throw new NotFoundException(`No se encontró el topping con id ${id}`);
    }

    return topping;
  }

  async update(id: number, updateToppingDto: UpdateToppingDto) {
    await this.findOne(id);
    return this.toppingsRepository.update(id, updateToppingDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.toppingsRepository.remove(id);
  }
}
