import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Ajuste o caminho relativo para onde está o seu prisma.service.ts

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}