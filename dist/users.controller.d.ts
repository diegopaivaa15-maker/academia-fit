import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
    }[]>;
    createUser(body: {
        email: string;
        password: string;
    }): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
    }>;
}
