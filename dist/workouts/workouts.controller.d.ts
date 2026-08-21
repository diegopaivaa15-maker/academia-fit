import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
export declare class WorkoutsController {
    private readonly workoutsService;
    constructor(workoutsService: WorkoutsService);
    findAll(req: any, page?: string, limit?: string): Promise<{
        data: ({
            exercises: {
                id: number;
                name: string;
                sets: number;
                reps: number;
                weight: number;
                durationSeconds: number | null;
                mediaUrl: string | null;
                workoutId: number;
                muscleGroupId: number | null;
                libraryId: number | null;
            }[];
        } & {
            id: number;
            name: string;
            description: string;
            userId: number;
            createdAt: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    create(createWorkoutDto: CreateWorkoutDto, req: any): Promise<{
        exercises: {
            id: number;
            name: string;
            sets: number;
            reps: number;
            weight: number;
            durationSeconds: number | null;
            mediaUrl: string | null;
            workoutId: number;
            muscleGroupId: number | null;
            libraryId: number | null;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        userId: number;
        createdAt: Date;
    }>;
    delete(id: string, req: any): Promise<{
        id: number;
        name: string;
        description: string;
        userId: number;
        createdAt: Date;
    }>;
    update(id: string, body: {
        name?: string;
        description?: string;
    }, req: any): Promise<{
        id: number;
        name: string;
        description: string;
        userId: number;
        createdAt: Date;
    }>;
}
