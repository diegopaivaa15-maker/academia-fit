              import 'reflect-metadata';
              import { NestFactory } from '@nestjs/core';
              import { AppModule } from './app.module';
              import { ValidationPipe } from '@nestjs/common';
              import { AllExceptionsFilter } from './filters/all-exceptions.filter';
              import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
              import { NestExpressApplication } from '@nestjs/platform-express';
              import { join } from 'path';

          // Criamos a função assíncrona
          async function bootstrap() {
        // Alteração: Informamos que o NestJS usará o Express como motor
        const app = await NestFactory.create<NestExpressApplication>(AppModule);

          app.enableCors({ 
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
            credentials: true 
            });

            // --- NOVA CONFIGURAÇÃO PARA AS FOTOS ---
        // Isso diz ao servidor: "Tudo que estiver na pasta 'uploads' pode ser acessado via link"
        app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });

      const config = new DocumentBuilder()
          .setTitle('API de Treinos')
          .setDescription('Documentação do meu app de treinos')
          .setVersion('1.0')
          .addBearerAuth()
          .build();
          
          const document = SwaggerModule.createDocument(app, config);
          SwaggerModule.setup('api', app, document);
          // Ativa a validação automática em toda a aplicação
          app.useGlobalPipes(new ValidationPipe());
          app.useGlobalFilters(new AllExceptionsFilter()); // Ativa o filtro global 
          
          // Aqui dizemos para a aplicação escutar na porta 3000
          await app.listen(3000);
          console.log('Servidor rodando com sucesso na porta 3000!');
          }

          // Chamamos a função UMA VEZ aqui fora para iniciar tudo
          bootstrap();

