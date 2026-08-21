    import { Controller, Post, Body, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
    import { extname } from 'path';
    import { Request } from 'express'; // Necessário para acessar o corpo da requisição (req.body)
    import { AuthService } from './auth.service'; // <-- Importamos o AuthService para validar o login/cadastro no banco

    @Controller('auth') // Define que todas as rotas neste arquivo começam com /auth
    export class AuthController {
      
      // Injetamos o AuthService no construtor para poder chamar as regras de negócio
      constructor(private readonly authService: AuthService) {}

      // ==========================================
      // NOVA ROTA DE LOGIN: POST /auth/login
      // ==========================================
      @Post('login')
      async login(@Body() body: any) {
        // Repassa os dados (email e senha) vindos do front-end para o serviço processar
        return this.authService.login(body);
      }

      // ==========================================
      // NOVA ROTA DE CADASTRO: POST /auth/register
      // ==========================================
      @Post('register')
      async register(@Body() body: any) {
        // Repassa os dados de cadastro para o serviço salvar no banco
        return this.authService.register(body);
      }

      // ==========================================
      // ROTA EXISTENTE DE UPLOAD DE FOTO: POST /auth/upload-foto
      // ==========================================
      @Post('upload-foto') // Rota final: POST http://localhost:3000/auth/upload-foto
      
      // O FileInterceptor processa o upload vindo do FormData do React
      // 'foto' deve ser o mesmo nome que você usa no formData.append('foto', ...) do front-end
      @UseInterceptors(FileInterceptor('foto', {
        
        // storage define como o arquivo será salvo no disco (localmente)
        storage: diskStorage({
          destination: './uploads', // Pasta onde a imagem será armazenada
          filename: (req, file, cb) => {
            // Gerador de nome único (hash) para evitar sobrescrever arquivos com o mesmo nome
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            // Retorna o novo nome concatenado com a extensão original (.jpg, .png, etc)
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }))
      
      // O método recebe o arquivo processado pelo Multer e o objeto de requisição completo
      uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        
        // Como o front-end envia um FormData, os outros campos (nome/email) ficam dentro do req.body
        const { nome, email } = req.body;
        
        // Log para depuração: verifique no terminal do NestJS se os dados chegaram
        console.log('Dados recebidos:', { nome, email, arquivo: file.originalname });
        
        // Retorna a resposta para o cliente com a URL pública da foto
        return {
          message: 'Foto e dados processados com sucesso!',
          dados: { nome, email }, // Confirmamos os dados que chegaram
          url: `http://localhost:3000/uploads/${file.filename}`, // URL que o Front usará para exibir a imagem
        };
      }
    }