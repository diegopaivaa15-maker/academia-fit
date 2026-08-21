        import { IsString, IsInt, Min, IsOptional } from 'class-validator';

        export class CreateExerciseDto {
            @IsString()
            name!: string;

            @IsInt()
            @Min(1)
            sets!: number;

            @IsInt()
            @Min(1)
            reps!: number;

            @IsInt()
            @Min(0)
            @IsOptional() // Opcional, caso o exercício não tenha tempo
            durationSeconds?: number;

            @IsString()
            @IsOptional() // Opcional, caso o usuário ainda não tenha o link
            mediaUrl?: string;
        }