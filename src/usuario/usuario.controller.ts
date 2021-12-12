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
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import AuthUsuario from 'src/auth/auth-user.decorator';

@Controller('usuario')
export class UsuarioController {
  constructor(private service: UsuarioService) {}

  @Post('create')
  create(@Body() data: CreateUsuarioDto): Promise<Usuario> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return this.service.update(id, data);
  }

  @Get('findMany')
  findMany(): Promise<any[]> {
    return this.service.findMany();
  }

  @Get('findUnique/:id')
  findUnique(@Param('id') id: string): Promise<Usuario> {
    return this.service.findUnique(id);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(id);
  }

  @UseGuards(AuthGuard())
  @Patch('addList/:id')
  addList(@AuthUsuario() usuario: Usuario, @Param('id') filmeId: string) {
    return this.service.addList(usuario, filmeId);
  }
}
