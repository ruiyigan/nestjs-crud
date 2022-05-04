import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UserController {
    constructor(userservice: UsersService) {}

    @Get()
    getUsers() {
        return 'Hello';
    }
}