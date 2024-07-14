var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserManager } from "./classes/userManager.js";
const form = document.querySelector('form');
const documentId = document.querySelector("#id");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const avatar = document.querySelector("#avatar");
let isUpdating = false;
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const newUser = {
        id: documentId.value,
        name: name.value,
        email: email.value,
        avatar: avatar.value,
    };
    const userManager = new UserManager();
    const isValidId = yield userManager.validateUserId(newUser.id);
    const isValidEmail = yield userManager.validateUserEmail(newUser.email);
    if (isUpdating) {
        yield userManager.updateUser(newUser.id, newUser);
        console.log('Actualizado');
    }
    else {
        if (isValidId && isValidEmail) {
            yield userManager.createUser(newUser);
            console.log('Creado');
        }
        else {
            if (!isValidId) {
                alert('El ID ya está en uso');
            }
            if (!isValidEmail) {
                alert('El Email ya está en uso');
            }
        }
    }
    // if(newUser.id === undefined){
    //     if(isValidId && isValidEmail){
    //         await userManager.createUser(newUser);
    //         console.log('Creado');
    //     } else {
    //         if (!isValidId) {
    //             alert('El ID ya está en uso');
    //         }
    //         if (!isValidEmail) {
    //             alert('El Email ya está en uso');
    //         }
    //     }
    // } else {
    //     await userManager.updateUser(newUser.id, newUser);
    //     console.log('Actualizado');
    // }
    form.reset();
    isUpdating = false;
}));
function foundID(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userManager = new UserManager();
        const user = yield userManager.getUserById(userId);
        if (user) {
            documentId.value = user.id;
            name.value = user.name;
            email.value = user.email;
            avatar.value = user.avatar;
            isUpdating = true;
        }
    });
}
function listUserToUpdate() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    if (userId) {
        foundID(userId);
    }
}
listUserToUpdate();
// if (!/^\d+$/.test(id.value)) {
//     alert('ID debe ser un número');
//     return;
// }
