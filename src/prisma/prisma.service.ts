// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Comentário: Conecta automaticamente ao banco assim que o app inicia
  async onModuleInit() {
    await this.$connect();
  }
}