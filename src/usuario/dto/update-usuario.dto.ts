import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(6, 150)
  nome: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 150)
  email: string;

  @IsString()  
  linkImagem: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  senha: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  confirmaSenha: string;
}
