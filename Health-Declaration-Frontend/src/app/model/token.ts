import { TokenType } from "@angular/compiler";
import { User } from "./user.interface";

export class Token {
    id: number;
    token: string;
    tokenType: TokenType;
    expired: boolean;
    revoked: boolean;
    user: User;

    constructor(id: number, token: string, tokenType: TokenType, expired: boolean, revoked: boolean, user: User) {
        this.id = id;
        this.token = token;
        this.tokenType = tokenType;
        this.expired = expired;
        this.revoked = revoked;
        this.user = user;
    }
}