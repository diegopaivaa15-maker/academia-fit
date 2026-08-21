// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

        @Injectable()
        // Definimos o PassportStrategy com a estratégia 'jwt'
         export class JwtStrategy extends PassportStrategy(Strategy) {
         constructor() {
            super({
            // Extrai o token do Header da requisição como Bearer Token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET_KEY_ACADEMIA',
    });
  }

        // O método validate é obrigatório e precisa retornar um objeto.
        // O Passport injeta o payload decodificado do JWT automaticamente.
        async validate(payload: any) {
            console.log('--- ESTRATÉGIA VALIDANDO O TOKEN ---');
            // Retornamos um objeto com os dados que queremos deixar disponíveis 
            // dentro de qualquer rota que use o @UseGuards(JwtAuthGuard)
            console.log('--- TOKEN VALIDADO COM SUCESSO! ---');
    console.log('Payload do token:', payload);
    return { userId: payload.sub, email: payload.email };
  }
}