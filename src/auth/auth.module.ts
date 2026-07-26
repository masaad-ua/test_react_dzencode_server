import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'secret_key',
            signOptions: {
                expiresIn: '1h'
            }
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
