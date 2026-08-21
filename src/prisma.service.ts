import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // A versão 7 exige um objeto de configuração. Passar um objeto vazio {} satisfaz o requisito.
    super({});
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Banco de dados conectado com sucesso!');
  }
}