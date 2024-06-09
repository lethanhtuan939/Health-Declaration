import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.url.includes('/api/v1/auth') && !request.url.includes('logout')) {
            return next.handle(request);
        }

        const token = this.tokenService.token;
        if (token) {
            const authReq = request.clone({
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + token
                })
            });
            return next.handle(authReq);
        }
        return next.handle(request);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
];