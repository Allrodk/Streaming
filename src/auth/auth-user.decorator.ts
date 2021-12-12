import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from '@prisma/client';

const AuthUsuario = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const usuario = request.user as Usuario;  
  delete usuario.senha;
  return usuario;
});

export default AuthUsuario;
