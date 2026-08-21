import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Importa a conexão com o banco

       @Injectable()
export class UsersService {
    // O construtor injeta o Prisma para que possamos usá-lo aqui
    constructor(private prisma: PrismaService) {}

        // Este método busca todos os usuários no banco
        async findall() {
            // Usamos a tabela 'user' (definida no schema.prisma) para buscar tudo
            return this.prisma.user.findMany();
        }

        // Método para salvar um novo usuário
        async create(data: { email: string, password: string }) {
            return this.prisma.user.create({
                data: {
                    email: data.email,
                    password: data.password, // Em um projeto real, você criptografaria essa senha!
                },
            });
        }

        // --- NOVO MÉTODO ABAIXO ---
        // Este método busca um único usuário pelo e-mail
        // É essencial para validar o login no AuthService
        async findByEmail(email: string) {
            return this.prisma.user.findUnique({
                where: { email }, // Filtra buscando pelo campo 'email' único
            });
        }
    }