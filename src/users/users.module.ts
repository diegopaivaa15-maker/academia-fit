import { Module } from '@nestjs/common';
import { UsersService } from '../users.service'; 
import { PrismaService } from '../prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService], // MUITO IMPORTANTE: Isso permite que o AuthModule use o serviço
})
export class UsersModule {}