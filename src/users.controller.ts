import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

    @Controller('users') // Define a URL base como /users
    export class UsersController{
        constructor(private readonly usersService: UsersService){}

        // O decorator @Get() diz que essa função responde a requisições de leitura
        @Get()
        async getAllUsers(){
            // Chama o serviço para buscar os dados
            return this.usersService.findall();
        }
        // O decorator @Post() define que essa rota aceita envios de dados
         // O @Body() extrai os dados que vieram no corpo da requisição (o JSON)
       @Post()
        async createUser(@Body() body: { email: string, password: string }) {
         return this.usersService.create(body);
     }
}