import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from '../prisma.service';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService],
})
export class UsuarioModule {}
