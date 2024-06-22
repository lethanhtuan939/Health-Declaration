import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../model/util/eviroment';
import { ResponseObject } from '../model/response/response-object';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(`${this.BASE_URL}auth/login`, { email, password });
  }

  verify(token: string): Observable<ResponseObject> {
    return this.httpClient.get<ResponseObject>(`${this.BASE_URL}auth/verify/${token}`);
  }

  register(user: User): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(`${this.BASE_URL}auth/register`, user);
  }

  logout() {
    this.httpClient.get<ResponseObject>(`${this.BASE_URL}auth/logout`).subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Failed to logout', error);
      }
    });
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }
}
