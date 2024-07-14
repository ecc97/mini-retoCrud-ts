import { UserManager } from "./classes/userManager.js";
import { IResponse } from "./interface/interface.js";

const form = document.querySelector('form') as HTMLFormElement;

const documentId = document.querySelector("#id") as HTMLInputElement;
const name = document.querySelector("#name") as HTMLInputElement;
const email = document.querySelector("#email") as HTMLInputElement;
const avatar = document.querySelector("#avatar") as HTMLInputElement

let isUpdating = false;

form.addEventListener("submit", async (e:Event) => {
    e.preventDefault();
    
    const newUser: IResponse = {
        id: documentId.value,
        name: name.value,
        email: email.value,
        avatar: avatar.value,
    }
    
    const userManager = new UserManager();
    const isValidId = await userManager.validateUserId(newUser.id);
    const isValidEmail = await userManager.validateUserEmail(newUser.email)

    if (isUpdating) {
        await userManager.updateUser(newUser.id, newUser);
        console.log('Actualizado');
    } else {

        if(isValidId && isValidEmail){
            await userManager.createUser(newUser);
            console.log('Creado');
        } else {
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
})

async function foundID(userId: string){
    const userManager = new UserManager();
    const user = await userManager.getUserById(userId);
    if(user){
        documentId.value = user.id;
        name.value = user.name;
        email.value = user.email;
        avatar.value = user.avatar;
        isUpdating = true;
    } 
}

function listUserToUpdate(): void {
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