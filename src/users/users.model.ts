export class User {
    id: string;
    name: string;
    age: number;
    surname: string;
    email: string;

    constructor(id: string, name:string, age:number, surname: string, email: string) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.surname = surname;
        this.email = email;
    }
}