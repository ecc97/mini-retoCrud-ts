var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserManager } from './classes/userManager.js';
import { ListTemplate } from './classes/listTemplate.js';
const div = document.querySelector('.item-list');
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const userManager = new UserManager(); // Initialize the UserManager class
    const data = yield userManager.getAllUsers();
    const list = new ListTemplate(div);
    data.map((user) => {
        list.render(user);
    });
}));
// async function getAllUsers(): Promise<IResponse[]> {
//     const response = await fetch("http://localhost:3000/users")
//     const data = await response.json()
//     return data  
// }
