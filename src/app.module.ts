import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { FilmesModule } from './filmes/filmes.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UsuarioModule, FilmesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
