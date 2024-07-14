import { IResponse } from "../interface/interface.js";

const url: string = "http://localhost:3000/users"

export class UserManager {
    constructor(){

    }
    async getAllUsers(): Promise<IResponse[]> {
        const response = await fetch(url)
        const data = await response.json()
        return data  
    }

    async createUser(user: IResponse): Promise<void> {
        console.log(user);

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

    async validateUserId(userId: string): Promise<boolean> {
        const response = await fetch(`${url}/${userId}`)

        if (response.status === 404) {
            return true; // El usuario no existe
        } else {
            return false; // El usuario ya existe
        }
    }

    async validateUserEmail(userEmail: string): Promise<boolean> {
        const response = await fetch(`${url}?email=${userEmail}`)
        const data = await response.json()
        
        if(data.length === 0){
            return true // El email no está en uso
        } else {
            return false // El email ya está en uso
        }
    }
    
    async updateUser(userId: string, updatedUser: IResponse): Promise<void> {
        await fetch(`${url}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        console.log('Usuario actualizado');
    }

    async getUserById(userId: string): Promise<IResponse> {
        const response = await fetch(`${url}/${userId}`);
        const data = await response.json();
        return data;
    }

    async deleteUser(userId: string): Promise<void> {
        await fetch(`${url}/${userId}`, {
            method: 'DELETE'
        });
        console.log('Usuario eliminado');
    }
}