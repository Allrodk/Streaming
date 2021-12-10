import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumberString,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateFilmeDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  titulo: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  ano: number;

  @IsInt()
  @Min(50)
  @Max(300)
  duracao: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 5)
  classificacao: string;

  @IsString()
  @Length(3, 30)
  genero: string;

  @IsString()
  linkImagem: string;
}
