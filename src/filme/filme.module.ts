import { Module } from '@nestjs/common';
import { FilmesService } from './filme.service';
import { FilmesController } from './filme.controller';
import { PrismaService } from '../prisma.service';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [FilmesService, PrismaService],
  controllers: [FilmesController],
})
export class FilmesModule {}
