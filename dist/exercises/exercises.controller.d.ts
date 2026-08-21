export declare class ExercisesController {
    getByCategory(muscleGroup: string, subGroup?: string): Promise<{
        id: number;
        name: string;
        muscleGroup: string;
        subGroup: string;
        instructions: string;
    }[]>;
}
