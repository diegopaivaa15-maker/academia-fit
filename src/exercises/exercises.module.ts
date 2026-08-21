import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste o caminho para achar o prisma.service.ts

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService, PrismaService], // <-- Colocamos o PrismaService direto aqui!
})
export class ExercisesModule {}