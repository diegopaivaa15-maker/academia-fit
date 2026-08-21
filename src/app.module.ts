        // src/app.module.ts
        import { Module } from '@nestjs/common';
        import { PrismaService } from './prisma.service';
        import { UsersController } from './users.controller';
        import { UsersService } from './users.service';
        import { AuthModule } from './auth/auth.module';
        import { WorkoutsModule } from './workouts/workouts.module';
        import { PrismaModule } from './prisma/prisma.module';
        import { UsersModule } from './users/users.module';
        import { AuthController } from './auth/auth.controller';
        import { ExercisesModule } from './exercises/exercises.module';

        @Module({
        imports: [AuthModule, WorkoutsModule, PrismaModule, UsersModule, ExercisesModule],
        controllers: [UsersController, AuthController], // Registra o controller
        providers: [PrismaService, UsersService], // Registra o serviço
        })
        export class AppModule {}
        