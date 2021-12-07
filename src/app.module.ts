import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { FilmesModule } from './filmes/filmes.module';
@Module({
  imports: [UsuarioModule, FilmesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
