// src/auth/auth.service.ts
        import { Injectable } from '@nestjs/common';
        import { JwtService } from '@nestjs/jwt';
        import { UsersService } from './../users.service';
        import * as bcrypt from 'bcrypt'; // Importamos o bcrypt para segurança

        @Injectable()
        export class AuthService {
        constructor(
            private usersService: UsersService,
            private jwtService: JwtService,
        ) {}

        // Método que valida se o usuário existe e a senha está correta
        async validateUser(email: string, pass: string): Promise<any> {
            const user = await this.usersService.findByEmail(email);

            // Comparamos a senha digitada com o hash salvo no banco
            if (user && await bcrypt.compare(pass, user.password)) {
            // Remove a senha do objeto antes de retornar para não expor dados
            const { password, ...result } = user; 
            return result;
            }
            return null; // Retorna null se falhar a validação
        }

        // Método que gera o token JWT após o login ser validado
        async login(user: any) {
            // Payload são as informações que ficarão dentro do token
            const payload = { sub: user.id, email: user.email, role: user.role };

            return {
            access_token: this.jwtService.sign(payload), // Assina o token com a chave secreta
            };
        }

        // Método que registra um novo usuário (já com senha hashada)
        async register(data: { email: string; password: string; role: string }) {
            // Geramos o hash da senha antes de salvar no banco
            const hashedPassword = await bcrypt.hash(data.password, 10);
            
            // Passamos o dado com a senha protegida para o service de usuários
            return this.usersService.create({
                ...data,
                password: hashedPassword
            });
        }
        }