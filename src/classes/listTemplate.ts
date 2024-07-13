import { IResponse } from "../interface/interface.js";

export class ListTemplate {
    container: HTMLUListElement

    constructor(container: HTMLUListElement){
        this.container = container
    }

    render(user: IResponse){
        const article = document.createElement('article')
        article.textContent = `${user.name} (${user.email})`;
        this.container.appendChild(article)
    }
}