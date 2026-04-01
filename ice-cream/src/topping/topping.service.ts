import { Injectable } from '@nestjs/common';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';
export interface Toppings {
  id: string;
  name: string;
  price: number;
}

@Injectable()
export class ToppingService {
  private toppings: Toppings[] = [];

  obtenerToppings() {
    return this.toppings;
  }

  untopping(id: string) {
    return this.toppings.find((topping) => topping.id === id);
  }

  crearTopping(topping: any) {
    const nuevoTopping: Toppings = {
      id: (this.toppings.length + 1).toString(),
      name: topping.name,
      price: topping.price,
    };
    this.toppings.push(nuevoTopping);
    return nuevoTopping;
  }

  actualizarTopping(id: string, topping: any) {
    return 'actualizar un topping';
  }

  eliminarTopping() {
    return 'eliminar un topping';
  }
}
