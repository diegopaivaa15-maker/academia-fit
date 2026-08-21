import { PrismaService } from '../prisma/prisma.service';
import { ExerciseDto } from './dto/exercise.dto';
export declare class ExercisesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByMuscleGroup(group: string, subGroup?: string, page?: number): Promise<ExerciseDto[]>;
}
