import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

      @Injectable()
      export class WorkoutsService {
      constructor(private prisma: PrismaService){}

      // Altere o serviço para converter o userId para número
      async findAll(userId: string, page: number = 1, limit: number = 10) {
      const skip = (page - 1) * limit;

      const workouts = await this.prisma.workout.findMany({
      where: { userId: Number(userId) }, // Converter string para Number~
      include: { 
      exercises: true // Isso força o Prisma a buscar os exercícios ligados a cada treino
    },
      skip: skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      });

      const total = await this.prisma.workout.count({ 
      where: { userId: Number(userId) } // Converter aqui também
        });

      return {
      data: workouts,
      meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
          },
        };
    }
      // ETAPA 1: Criar treino + lista de exercícios em uma única operação
      async create(data: { 
      name: string; 
      description: string; 
      userId: number; 
      exercises: { name: string; sets: number; reps: number }[] 
      }) {
      return this.prisma.workout.create({
      data: {
      name: data.name,
      description: data.description,
      userId: data.userId,
      exercises: {
      create: data.exercises, 
      },
  },
  // Adicionamos o 'include' aqui para o Prisma devolver o treino COM os exercícios
    include: {
      exercises: true,
    },
  });
}
    // Remove um treino filtrando pelo ID e validando se pertence ao usuário
      async delete(workoutId: number, userId: number) {
        // 1. Primeiro, tentamos encontrar o treino para garantir que ele é do usuário
        const workout = await this.prisma.workout.findFirst({
         where: { 
        id: workoutId, // Aqui é 'id' porque é a chave primária da tabela Workout
        userId: userId 
      },
    });

        // 2. Se não existir, lançamos um erro (ou tratamos como preferir)
        if (!workout) {
          throw new Error('Treino não encontrado ou você não tem permissão.');
        }

        // 3. Se existir, deletamos pelo ID
        return this.prisma.workout.delete({
       where: { id: workoutId },
        });
    }

      // Atualiza um treino existente validando se ele pertence ao usuário
      async update(id: number, userId: number, data: {name?: string; description?:string}){
        // 1. Verificamos se o treino pertence ao usuário
        const workout = await this.prisma.workout.findFirst({
          where: {id, userId},
        });
        if(!workout){
          throw new Error('Treino não encontrado ou você não tem permissão para editá-lo.');
        }
        // 2. Se pertencer, fazemos a atualização
        return this.prisma.workout.update({
          where: {id},
          data: data,
        })
      }
  }