import {
  Controller,
  Body,
  Patch,
  Post,
  Param,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilmesService } from './filme.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('filme')
export class FilmesController {
  constructor(private service: FilmesService) {}

  @UseGuards(AuthGuard())
  @Post('create')
  create(@Body() data: CreateFilmeDto): Promise<Filme> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateFilmeDto,
  ): Promise<Filme> {
    return this.service.update(id, data);
  }

  @Get('find-all')
  findall(): Promise<any[]> {
    return this.service.findall();
  }

  @Get('find-one/:id')
  findone(@Param('id') id: string): Promise<Filme> {
    return this.service.findone(id);
  }

    @UseGuards(AuthGuard())
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<{ message: string }> {
      return this.service.remove(id);
    }
}
