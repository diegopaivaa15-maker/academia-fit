        import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
        import { error } from 'node:console';
        import { timestamp } from 'rxjs';

        @Catch()
        export class AllExceptionsFilter implements ExceptionFilter{
            catch(exception: unknown, host: ArgumentsHost){
                const ctx = host.switchToHttp();
                const response = ctx.getResponse();

                // Define se é um erro conhecido do NestJS ou um erro desconhecido do servidor
                const status = exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

                const message = exception instanceof HttpException
                ? exception.getResponse()
                : 'Erro interno no servidor';

                // Formata a resposta de forma profissional
                response.status(status).json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    error: message,
                });
            }
        }