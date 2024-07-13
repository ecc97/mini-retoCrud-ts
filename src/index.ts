import { IResponse } from './interface/interface.js'
import { ListTemplate } from './classes/listTemplate.js';

const div  = document.querySelector('.item-list') as HTMLUListElement;

document.addEventListener('DOMContentLoaded', async () => {
    const data: IResponse[] = await getAllUsers();
    const list = new ListTemplate(div);

    data.map((user: IResponse) => {
        list.render(user);
    })
})

async function getAllUsers(): Promise<IResponse[]> {
    const response = await fetch("http://localhost:3000/users")
    const data = await response.json()
    return data  
}