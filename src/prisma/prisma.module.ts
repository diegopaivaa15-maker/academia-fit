// src/prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 

@Global() // Isso faz com que o PrismaService esteja disponível em toda a aplicação
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Isso permite que outros módulos o utilizem
})
export class PrismaModule {}