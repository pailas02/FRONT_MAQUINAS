import { Chat } from "./chat.model";

export class Usuario {
    id?: number;
    userId?: string;
    nombre?: string;
    email?: string;
    pasword?: string;
    chatId?:Chat;
    
}
