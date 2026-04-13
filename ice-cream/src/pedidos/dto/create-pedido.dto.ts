import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Primero definimos qué lleva cada item del helado
export class DetallePedidoDto {
  @IsNumber()
  productoId!: number;

  @IsNumber()
  @IsOptional()
  toppingId?: number;
}

// Luego definimos el pedido general
export class CreatePedidoDto {
  @IsString()
  clienteNombre!: string;

  @IsString()
  telefono!: string;

  @IsString()
  direccion!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetallePedidoDto)
  items!: DetallePedidoDto[];
}
