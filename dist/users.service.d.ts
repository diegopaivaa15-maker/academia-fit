import { PrismaService } from './prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findall(): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
    }[]>;
    create(data: {
        email: string;
        password: string;
    }): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
    } | null>;
}
