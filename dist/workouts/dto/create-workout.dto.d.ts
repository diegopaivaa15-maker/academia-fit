import { CreateExerciseDto } from './create-exercise.dto.ts.js';
export declare class CreateWorkoutDto {
    name: string;
    description: string;
    exercises: CreateExerciseDto[];
}
