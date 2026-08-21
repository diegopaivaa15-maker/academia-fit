        // Importamos os decoradores e exceções padrão do NestJS
        import { Injectable, NotFoundException } from '@nestjs/common';
        // Importamos o serviço de conexão com o banco de dados via Prisma
        import { PrismaService } from '../prisma/prisma.service';
        // Importamos o DTO para garantir a tipagem dos dados que saem do serviço
        import { ExerciseDto } from './dto/exercise.dto';


        @Injectable()
        export class ExercisesService {
        
        // Injetamos o PrismaService para acessar o banco de dados
        constructor(private readonly prisma: PrismaService) {}

        /**
         * Busca exercícios filtrando por grupo principal e opcionalmente por subgrupo.
         * @param group - Grupo muscular principal (Ex: "Ombro")
         * @param subGroup - Subgrupo opcional (Ex: "Deltoide Anterior")
         * @param page - Número da página atual para paginação
         */
        async findByMuscleGroup(group: string, subGroup?: string, page: number = 1): Promise<ExerciseDto[]> {
            const limit = 20;
            const skip = (page - 1) * limit;

            // Declaramos o objeto de filtro tipado corretamente como 'any' para aceitar propriedades dinâmicas
            const whereCondition: any = {
            muscleGroup: { equals: group, mode: 'insensitive' },
            };

            // Se o usuário passou um subgrupo válido, adicionamos na regra de busca do banco
            if (subGroup && subGroup !== 'Todos') {
            whereCondition.subGroup = { equals: subGroup, mode: 'insensitive' };
            }

            // Executamos a busca no banco utilizando a condição montada dinamicamente
            const exercisesFromDb = await this.prisma.exerciseLibrary.findMany({
            where: whereCondition,
            take: limit,
            skip: skip,
            orderBy: { name: 'asc' },
            });

            if (!exercisesFromDb || exercisesFromDb.length === 0) {
            throw new NotFoundException(`Nenhum exercício encontrado para ${group} ${subGroup ? `(${subGroup})` : ''}`);
            }

            // Mapeamos os dados do banco para o formato do DTO
            return exercisesFromDb.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            muscleGroup: exercise.muscleGroup,
            subGroup: exercise.subGroup ?? undefined,
            instructions: exercise.instructions ?? undefined,
            videoUrl: exercise.videoUrl ?? undefined,
            }));
        }
        }