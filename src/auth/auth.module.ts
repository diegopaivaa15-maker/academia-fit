import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; // Importante!
import { UsersModule } from '../users/users.module'; 

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:  'SECRET_KEY_ACADEMIA', // Esta chave DEVE ser igual à do seu jwt.strategy.ts
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // O JwtStrategy precisa estar aqui
  exports: [AuthService],
})
export class AuthModule {}