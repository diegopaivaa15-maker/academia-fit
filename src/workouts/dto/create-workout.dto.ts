        import { IsString, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
        import { Type } from 'class-transformer';
        import { CreateExerciseDto } from './create-exercise.dto.ts.js';

        export class CreateWorkoutDto{
            @IsString()
            @IsNotEmpty() // Nao permite nome vazio
            name!: string;

            @IsString()
            description!: string;

            @IsArray() // Garanta que o campo exercises seja uma lista
            @ValidateNested({ each: true }) // valida cada item dentro da lista
            @Type(() => CreateExerciseDto) // transforma os dados para o formato do DTO
            exercises!: CreateExerciseDto[];
        }
