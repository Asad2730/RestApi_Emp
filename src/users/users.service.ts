import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            role: "INTERN"
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob.smith@example.com",
            role: "ENGINEER"
        },
        {
            id: 3,
            name: "Charlie Brown",
            email: "charlie.brown@example.com",
            role: "ADMIN"
        },
        {
            id: 4,
            name: "Diana Ross",
            email: "diana.ross@example.com",
            role: "ENGINEER"
        },
        {
            id: 5,
            name: "Ethan Hunt",
            email: "ethan.hunt@example.com",
            role: "INTERN"
        }
    ];


    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(i => i.role === role)
        }

        return this.users
    }


    findOne(id: number) {
        const user = this.users.find(i => i.id === id)
        return user
    }

    create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const userByHighestId = [...this.users].sort((a: any, b: any) => b.id - a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }


    update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        this.users = this.users.map((user)=>{
            if(user.id === id){
                return {...user,...updatedUser}
            }
            return user
        })

        return this.findOne(id)
    }


    delete(id:number){
        const removedUser = this.findOne(id)
        this.users.filter(i=>i.id !== id)
        return removedUser
    }
}
