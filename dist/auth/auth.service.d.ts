import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(data: {
        email: string;
        password: string;
        role: string;
    }): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
    }>;
}
