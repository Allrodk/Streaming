import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CrendentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}

  async login(dadosLogin: CrendentialsDto) {
    const usuarioExiste = await this.db.usuario.findUnique({
      where: { email: dadosLogin.email },
    });

    if (!usuarioExiste) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    //Verifica se a senha está correta
    const senhaValida = await bcrypt.compare(
      dadosLogin.senha,
      usuarioExiste.senha,
    );

    // Prepara token único para cada usuário
    if (senhaValida) {
      const ingresso = {
        email: usuarioExiste.email,
      };
      const token = await this.jwt.sign(ingresso);
      return { token };
    } else {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }
}
