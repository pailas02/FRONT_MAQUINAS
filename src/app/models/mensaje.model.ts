import { Chat } from "./chat.model";
import { Usuario } from "./usuario.model";

export class Mensaje {
    id: number;
    contenido: string;
    chatId: Chat
    usuarioId: Usuario
}
