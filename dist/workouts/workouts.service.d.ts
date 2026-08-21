import { PrismaService } from '../prisma.service';
export declare class WorkoutsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string, page?: number, limit?: number): Promise<{
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
    create(data: {
        name: string;
        description: string;
        userId: number;
        exercises: {
            name: string;
            sets: number;
            reps: number;
        }[];
    }): Promise<{
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
    delete(workoutId: number, userId: number): Promise<{
        id: number;
        name: string;
        description: string;
        userId: number;
        createdAt: Date;
    }>;
    update(id: number, userId: number, data: {
        name?: string;
        description?: string;
    }): Promise<{
        id: number;
        name: string;
        description: string;
        userId: number;
        createdAt: Date;
    }>;
}
