import { IResponse } from "../interface/interface.js";
import { UserManager } from "../classes/userManager.js";

export class ListTemplate {
    container: HTMLUListElement

    constructor(container: HTMLUListElement){
        this.container = container
    }

    render(user: IResponse){
        const article = document.createElement('article')
        const h4 = document.createElement('h4') as HTMLHeadingElement
        const p = document.createElement('p') as HTMLParagraphElement
        const img = document.createElement('img') as HTMLImageElement
        const updateBtn = document.createElement('button') as HTMLButtonElement
        const deleteBtn = document.createElement('button') as HTMLButtonElement
        
        h4.textContent = user.name
        p.textContent = user.email
        img.src = user.avatar
        img.alt = user.name
        updateBtn.textContent = 'Update'
        deleteBtn.textContent = 'Delete'

        updateBtn.addEventListener('click', () => {
            window.location.href = `./pages/create.html?id=${user.id}`
        })

        deleteBtn.addEventListener('click', async () => {
            const userManager = new UserManager()
            const confirmDelete: boolean = confirm('Deseas eliminar este User?') 
            if(confirmDelete){
                await userManager.deleteUser(user.id)
                location.reload()  
            }
        })
        
        article.append(img, h4, p, updateBtn, deleteBtn)

        this.container.appendChild(article)
    }
}