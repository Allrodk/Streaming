import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from '@prisma/client';

@Injectable()
export class FilmesService {
  constructor(private db: PrismaService) {}

  async create(dadosFilme: CreateFilmeDto): Promise<Filme> {
    const filmeExiste = await this.db.filme.findUnique({
      where: { titulo: dadosFilme.titulo },
    });

    if (filmeExiste) {
      throw new ConflictException('Filme já cadastrado.');
    }

    const filme = await this.db.filme.create({ data: dadosFilme });
    return filme;
  }

  async findall(): Promise<Filme[]> {
    const filme = await this.db.filme.findMany();
    return filme;
  }

  async findone(id: string): Promise<Filme> {
    const filmeExiste = await this.db.filme.findUnique({
      where: { id },
    });
    if (!filmeExiste) {
      throw new NotFoundException('Filme não encontrado.');
    }
    return filmeExiste;
  }

  async update(id: string, dadosFilme: UpdateFilmeDto): Promise<Filme> {
    const filmeExiste = await this.db.filme.findUnique({
      where: { id },
    });
    if (!filmeExiste) {
      throw new NotFoundException('Filme não encontrado.');
    }
    
    const filme = await this.db.filme.update({
      data: dadosFilme,
      where: { id },
    });
    return filme;
  }

  async remove(id: string): Promise<{ message: string }> {
    const filmeExiste = await this.db.filme.findUnique({
      where: { id },
    });
    if (!filmeExiste) {
      throw new NotFoundException('Filme não encontrado.');
    } else {
      await this.db.filme.delete({
        where: { id },
      });
    }
    return { message: 'Filme deletado com susesso.' };
  }
}
