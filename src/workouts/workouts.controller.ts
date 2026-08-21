      // src/workouts/workouts.controller.ts
      import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param, Patch, Query } from '@nestjs/common';
      import { AuthGuard } from '@nestjs/passport';
      import { WorkoutsService } from './workouts.service';
      import { CreateWorkoutDto } from './dto/create-workout.dto';
      
      @Controller('workouts')
      export class WorkoutsController {
      constructor(private readonly workoutsService: WorkoutsService) {}

      @Get()
      @UseGuards(AuthGuard('jwt'))
      async findAll(
      @Request() req: any,
      @Query('page') page: string = '1', 
      @Query('limit') limit: string = '10'
      ) {
    // Convertemos para número e chamamos o service
      return this.workoutsService.findAll(
      req.user.userId, 
      parseInt(page), 
      parseInt(limit)
    );
  }
      
      @Post()
     @UseGuards(AuthGuard('jwt'))
    async create(@Body() createWorkoutDto: CreateWorkoutDto, @Request() req: any) {
    // Usamos o objeto 'createWorkoutDto' que já contém todos os dados validados
    return this.workoutsService.create({
      name: createWorkoutDto.name,
      description: createWorkoutDto.description,
      exercises: createWorkoutDto.exercises,
      userId: req.user.userId,
    });
  }

      @Delete(':id') // A rota será DELETE /workouts/1
      @UseGuards(AuthGuard('jwt')) // Protege a rota para apenas usuários logados
      async delete(@Param('id') id: string, @Request() req: any) {
        // Convertemos o id de string para número e chamamos o service
        return this.workoutsService.delete(Number(id), req.user.userId);
      }

          // Rota para editar um treino específico (ex: PATCH /workouts/1)
      @Patch(':id')
      @UseGuards(AuthGuard('jwt'))
      async update(
        @Param('id') id: string,
        @Body() body: { name?: string; description?: string },
        @Request() req: any,
      ) {
        // Chamamos o service passando o ID convertido, o userId do token e os novos dados
        return this.workoutsService.update(Number(id), req.user.userId, body);
      }
  }