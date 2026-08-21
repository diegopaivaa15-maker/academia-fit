        import { Controller, Get, Param, Query } from '@nestjs/common';
        import { ExercisesService } from './exercises.service';

        @Controller('exercises') // Define que todas as rotas aqui começam com /exercises
        export class ExercisesController {
        // Responde requisições GET para: http://localhost:3000/exercises/:muscleGroup
        @Get(':muscleGroup')
        async getByCategory(
            @Param('muscleGroup') muscleGroup: string, // Captura o grupo (ex: 'Peito', 'Costas')
            @Query('subGroup') subGroup?: string,       // Captura o subgrupo opcional se houver
        ) {
            // 💡 Dica: Aqui você faria a consulta no seu banco de dados (Prisma/TypeORM)
            // Exemplo de retorno simulado em formato JSON para o front-end renderizar:
            
    return [
      {
        id: 1,
        name: `Exercício Exemplo para ${muscleGroup}`,
        muscleGroup: muscleGroup,
        subGroup: subGroup || 'Geral',
        instructions: 'Executar de forma controlada mantendo a postura correta.',
      }
    ];
  }
}