// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

    @Controller()
        export class AppController{
            constructor(private readonly prisma: PrismaService){}
            // Quando alguém acessar a rota raiz (http://localhost:3000/), este método será chamado

            @Get()
            async getStatus(){
                const userCount = await this.prisma.user.count();return { 
                message: 'API da Academia está online!',
                totalUsuarios: userCount 
        };
      }
    }
