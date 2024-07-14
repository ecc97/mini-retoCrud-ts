var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserManager } from "../classes/userManager.js";
export class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(user) {
        const article = document.createElement('article');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const img = document.createElement('img');
        const updateBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        h4.textContent = user.name;
        p.textContent = user.email;
        img.src = user.avatar;
        img.alt = user.name;
        updateBtn.textContent = 'Update';
        deleteBtn.textContent = 'Delete';
        updateBtn.addEventListener('click', () => {
            localStorage.setItem('userId', user.id);
            window.location.href = `./pages/create.html`;
        });
        deleteBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const userManager = new UserManager();
            const confirmDelete = confirm('Deseas eliminar este User?');
            if (confirmDelete) {
                yield userManager.deleteUser(user.id);
                location.reload();
            }
        }));
        article.append(img, h4, p, updateBtn, deleteBtn);
        this.container.appendChild(article);
    }
}
