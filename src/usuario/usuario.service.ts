import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { isUndefined } from 'util';

@Injectable()
export class UsuarioService {
  constructor(private db: PrismaService) {}

  async create(dadosUsuario: CreateUsuarioDto): Promise<Usuario> {
    if (dadosUsuario.senha !== dadosUsuario.confirmaSenha) {
      throw new UnauthorizedException(
        'A senha e sua confirmação devem ser iguais.',
      );
    }

    const usuarioExiste = await this.db.usuario.findUnique({
      where: { email: dadosUsuario.email },
    });

    if (usuarioExiste) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    //Criação do Hash
    const saltos = 8;
    const hashSenha = await bcrypt.hash(dadosUsuario.senha, saltos);

    delete dadosUsuario.confirmaSenha;

    //Adiciona hashSenha ao json Usuario
    const usuario = await this.db.usuario.create({
      data: {
        ...dadosUsuario,
        senha: hashSenha,
      },
    });

    delete usuario.senha;
    return usuario;
  }

  //Falata fazer validações em update
  async update(id: string, dadosUsuario: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioExiste = await this.db.usuario.findFirst({
      where: { id },
    });

    if (!usuarioExiste) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (dadosUsuario.senha !== dadosUsuario.confirmaSenha) {
      throw new UnauthorizedException(
        'A senha e sua confirmação devem ser iguais.',
      );
    }

    //Criação do Hash
    const saltos = 8;
    const hashSenha = await bcrypt.hash(dadosUsuario.senha, saltos);

    delete dadosUsuario.confirmaSenha;

    const usuario = await this.db.usuario.update({
      data: {
        ...dadosUsuario,
        senha: hashSenha,
      },
      where: { id },
    });
    delete usuario.senha;

    return usuario;
  }

  async findMany(): Promise<any[]> {
    const usuario = await this.db.usuario.findMany();
    const usuarioSemSenha = usuario.map(({ senha, ...semSenha }) => semSenha);
    return usuarioSemSenha;
  }

  async findUnique(id: string): Promise<Usuario> {
    const usuario = await this.db.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não cadastrado.');
    }
    delete usuario.senha;

    return usuario;
  }

  async delete(id: string): Promise<{ message: string }> {
    const usuario = await this.db.usuario.findUnique({
      where: { id },
    });

    if (usuario) {
      await this.db.usuario.delete({
        where: { id },
      });
    } else {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return { message: 'Usuário encontrado e deletado com sucesso' };
  }
}
