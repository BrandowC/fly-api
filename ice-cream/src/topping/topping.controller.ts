import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ToppingService } from './topping.service';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';
import { Topping } from './entities/topping.entity';

@Controller({})
export class ToppingController {
  constructor(private readonly toppingService: ToppingService) {}

  @Get('/toppings')
  obtenertoppings() {
    return this.toppingService.obtenerToppings();
  }

  @Get('/toppings/:id')
  untopping(@Param('id') id: string) {
    return this.toppingService.untopping(id);
  }

  @Post('/toppings')
  creartoppind(@Body() topping: any) {
    return this.toppingService.crearTopping(topping);
  }

  @Patch(':id')
  actualizartopping(@Param('id') id: string, @Body() topping: any) {
    return this.toppingService.actualizarTopping(id, topping);
  }

  @Delete(':id')
  eliminartopping() {
    return this.toppingService.eliminarTopping();
  }
}
