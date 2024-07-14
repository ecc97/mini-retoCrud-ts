var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "http://localhost:3000/users";
export class UserManager {
    constructor() {
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url);
            const data = yield response.json();
            return data;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(user);
            yield fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        });
    }
    validateUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${url}/${userId}`);
            if (response.status === 404) {
                return true; // El usuario no existe
            }
            else {
                return false; // El usuario ya existe
            }
        });
    }
    validateUserEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${url}?email=${userEmail}`);
            const data = yield response.json();
            if (data.length === 0) {
                return true; // El email no está en uso
            }
            else {
                return false; // El email ya está en uso
            }
        });
    }
    updateUser(userId, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${url}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });
            console.log('Usuario actualizado');
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${url}/${userId}`);
            const data = yield response.json();
            return data;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${url}/${userId}`, {
                method: 'DELETE'
            });
            console.log('Usuario eliminado');
        });
    }
}
