export class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(user) {
        const article = document.createElement('article');
        article.textContent = `${user.name} (${user.email})`;
        this.container.appendChild(article);
    }
}
