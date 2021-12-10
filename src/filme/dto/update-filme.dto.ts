import { IsString, IsNotEmpty, Length } from 'class-validator';

export class UpdateFilmeDto {
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
