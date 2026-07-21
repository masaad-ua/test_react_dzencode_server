import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'secret_key',
            signOptions: { expiresIn: '1h' }
        }),
    ]
})
export class AuthModule {}
