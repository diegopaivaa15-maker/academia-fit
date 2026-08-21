    import { Test, TestingModule } from '@nestjs/testing';
    import { ExercisesController } from './exercises.controller';
    import { ExercisesService } from './exercises.service'; // Importante importar o service

    describe('ExercisesController', () => {
      let controller: ExercisesController;

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [ExercisesController],
          providers: [
            {
              provide: ExercisesService, // Aqui estamos dizendo ao teste: "Não use o banco real, use este 'boneco' (mock)"
              useValue: { findByMuscleGroup: jest.fn() },
            },
          ],
        }).compile();

        controller = module.get<ExercisesController>(ExercisesController);
      });

      it('should be defined', () => {
        expect(controller).toBeDefined();
      });
    });