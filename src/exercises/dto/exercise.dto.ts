
        // Esta interface define o formato esperado dos dados da biblioteca
        // Isso evita que o front-end receba dados desconhecidos

        export class ExerciseDto {
        id!: number;
        name!: string;
        muscleGroup!: string;
        instructions?: string;
        videoUrl?: string;
        }