import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    private readonly user = {
        id: 1,
        login: "admin",
        password: "admin123"
    }

    login(loginDto: LoginDto){
        const {login, password} = loginDto;

        if(
            login !== this.user.login ||
            password !== this.user.password
        ){
            throw new UnauthorizedException(
                'Invalid login or password',
            );
        }

        const payload = {
            sub: this.user.id,
            login: this.user.login
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}