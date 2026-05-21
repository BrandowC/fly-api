import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key']; // El admin debe enviar esto en los headers

    const ADMIN_KEY = 'tu_clave_secreta_aqui'; // En producción esto va en el .env

    if (apiKey !== ADMIN_KEY) {
      throw new UnauthorizedException('No tienes permisos de administrador');
    }
    return true;
  }
}
