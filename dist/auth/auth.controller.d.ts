import { Request } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        access_token: string;
    }>;
    register(body: any): Promise<{
        email: string;
        password: string;
        role: string;
        id: number;
    }>;
    uploadFile(file: Express.Multer.File, req: Request): {
        message: string;
        dados: {
            nome: any;
            email: any;
        };
        url: string;
    };
}
