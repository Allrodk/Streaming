import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private db: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(ingresso: { email: string }) {
    const usuario = await this.db.usuario.findUnique({
      where: { email: ingresso.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return usuario;
  }
}
