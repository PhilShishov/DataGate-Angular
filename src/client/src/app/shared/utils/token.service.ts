import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly accessToken: string = "token";

    setToken(token: string) {
        localStorage.setItem(this.accessToken, token);
    }

    getToken(): string {
        let token = localStorage.getItem(this.accessToken);
        return token;
    }

    removeToken() {
        localStorage.removeItem(this.accessToken);
    }

    hasToken(): boolean {
        if (this.getToken() != null) {
            return true;
        } else {
            return false;
        }
    }
}