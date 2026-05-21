import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateToppingDto {
  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  @Min(0)
  precio!: number;

  @IsOptional()
  @IsString()
  imagenUrl?: string;

  @IsBoolean()
  disponible!: boolean;
}
