import { Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { v4 as uuidv4 } from 'uuid';

// handles data management
@Injectable()
export class UsersService {
    // fake database, storing array of User objects
    private users: User[] = [];

    // [Users, number] is the return type
    private getUserById(id: string): [User, number] {
        const index = this.users.findIndex(u => u.id == id);
        return [this.users[index], index];
    }

    addUser(name: string, age: number, surname: string, email: string) {
        const id = uuidv4();
        const newUser = new User(id, name, age, surname, email);
        this.users.push(newUser);
        return id;
    }

    // use spread and return copy of array instead of the reference
    getUsers() {
        return [...this.users];
    }

    getUser(id: string) {
        return this.getUserById(id)[0];
    }

    updateUser(
        id: string,
        name: string,
        age: number,
        surname: string,
        email: string
    ) {
        const [targetUser, index] = this.getUserById(id);
        const newUserParams = { ...targetUser, name, age, surname, email };
        const newUser = new User(id, newUserParams.name, newUserParams.age, newUserParams.surname, newUserParams.email);
        this.users[index] = newUser;
        return newUser;
    }

    deleteUser(
        id: string
    ) {
        const [target, index] = this.getUserById(id);
        this.users.splice(index, 1);
    }

}