import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../model/util/eviroment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseObject } from '../model/response/response-object';
import { UserStatus } from '../model/enum/user-status.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userAvatarSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  userAvatar$: Observable<string | null> = this.userAvatarSubject.asObservable();

  private usersSubject = new BehaviorSubject<User[]>([]);
  user$ = this.usersSubject.asObservable();

  private readonly BASE_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  findAll(search: string = '', pageNo: number = 0, pageSize: number = 10, sortBy: string = 'id'): Observable<ResponseObject> {
    let params = new HttpParams()
      .set('q', search)
      .set('p', pageNo.toString())
      .set('limit', pageSize.toString())
      .set('sortBy', sortBy);

    return this.httpClient.get<ResponseObject>(`${this.BASE_URL}users`, { params }).pipe(
      tap(response => {
        this.usersSubject.next(response.data.data);
      })
    );
  }

  findByUniqueId(uniqueId: string): Observable<ResponseObject> {
    return this.httpClient.get<ResponseObject>(`${this.BASE_URL}users/${uniqueId}`);
  }

  findByToken(): Observable<ResponseObject> {
    return this.httpClient.get<ResponseObject>(`${this.BASE_URL}users/me`,);
  }

  update(uniqueId: string, user: User, file: File | null): Observable<ResponseObject> {
    const formData: FormData = new FormData();
    formData.append('data', JSON.stringify(user));
    if (file) {
      formData.append('avatar', file, file.name);
    }

    return this.httpClient.put<ResponseObject>(`${this.BASE_URL}users/${uniqueId}`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  updateUserAvatar(avatarUrl: string | null): void {
    this.userAvatarSubject.next(avatarUrl);
  }

  findAllRoles(): Observable<ResponseObject> {
    return this.httpClient.get<ResponseObject>(`${this.BASE_URL}roles`);
  }

  addRoles(uniqueId: string, roles: string[]): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(`${this.BASE_URL}users/${uniqueId}/add-roles`, { roles });
  }

  changeStatus(uniqueId: string, status: UserStatus): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(`${this.BASE_URL}users/${uniqueId}/change-status`, { status });
  }
}
