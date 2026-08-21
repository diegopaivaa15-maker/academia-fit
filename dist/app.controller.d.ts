import { PrismaService } from './prisma.service';
export declare class AppController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStatus(): Promise<{
        message: string;
        totalUsuarios: number;
    }>;
}
