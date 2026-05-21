import { IsNumber, IsOptional } from 'class-validator';

export class DetallePedidoDto {
  @IsNumber() productoId!: number;
  @IsNumber() @IsOptional() toppingId?: number;
}
