import { Controller, Post, Req, Param, UseGuards, Get } from '@nestjs/common';
// import { Request } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { User } from '../model/user.entity';

@Controller('auth')
export class AuthController {

    @Post('facebook')
    @UseGuards(AuthGuard('facebook-token'))
    facebookLogin(@Req() req): User {
        return req.user;
    }

    @Get('facebook')
    @UseGuards(AuthGuard('facebook-token'))
    getUser(@Req() req) {
        console.log(req);
        console.log(req.user);
    }
}
