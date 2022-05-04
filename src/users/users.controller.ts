import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";

// handling incoming requests from clients and returning clients responses
@Controller('users')
export class UserController {
    // prevent overriding of methods
    constructor(private readonly userservice: UsersService) {}

    // different from expressJS when you have req and res
    @Post()
    insertUser(
        // @Body means req => body (object) => attribute
        @Body('name') name: string,
        @Body('age') age: number,
        @Body('surname') surname: string,
        @Body('email') email: string,
    ) {
        const userId = this.userservice.addUser(name, age, surname, email);
        return {
            id: userId
        }
    }

    @Get()
    getAllUsers() {
        return this.userservice.getUsers();
    }

    // means http...user/<userId>
    @Get(':userId')
    getUser(
        // @Param means req => param
        @Param('userId') userId: string
    ) {
        return this.userservice.getUser(userId);
    }

    @Put(':userId')
    updateUser(
        @Param('userId') userId: string,
        @Body('name') name: string,
        @Body('age') age: number,
        @Body('surname') surname: string,
        @Body('email') email: string,
    ) {
        return this.userservice.updateUser(userId, name, age, surname, email);
    }

    @Delete(':userId')
    deleteUser(
        @Param('userId') userId: string
    ) {
        return this.userservice.deleteUser(userId);
    }
}