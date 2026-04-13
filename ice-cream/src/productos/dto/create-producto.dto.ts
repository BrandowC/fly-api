import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre!: string;

  @IsString()
  tipo!: string; // Sugerencia: validar que sea 'VASO' o 'HELADO'

  @IsNumber()
  @Min(0)
  precio!: number;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;
}
