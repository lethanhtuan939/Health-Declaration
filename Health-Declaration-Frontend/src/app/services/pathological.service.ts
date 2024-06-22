import { Injectable } from '@angular/core';
import { environment } from '../model/util/eviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pathological } from '../model/pathological.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseObject } from '../model/response/response-object';

@Injectable({
  providedIn: 'root'
})
export class PathologicalService {

  private readonly BASE_URL = environment.apiUrl;

  private pathologicalsSubject = new BehaviorSubject<Pathological[]>([]);
  pathologicals$ = this.pathologicalsSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  create(data: Pathological): Observable<ResponseObject> {
    return this.httpClient.post<ResponseObject>(`${this.BASE_URL}pathological`, data).pipe(
      tap(response => {
        this.findAll().subscribe();
      })
    );
  }

  update(data: Pathological): Observable<ResponseObject> {
    return this.httpClient.put<ResponseObject>(`${this.BASE_URL}pathological`, data).pipe(
      tap(response => {
        this.findAll().subscribe();
      })
    );
  }

  findAllWithoutPaging() {
    return this.httpClient.get<ResponseObject>(`${this.BASE_URL}pathological/`);
  }

  findAll(search: string = '', pageNo: number = 0, pageSize: number = 10, sortBy: string = 'id', type: string = 'ALL', status: string = 'ALL'): Observable<ResponseObject> {
    let params = new HttpParams()
      .set('q', search)
      .set('p', pageNo.toString())
      .set('limit', pageSize.toString())
      .set('sortBy', sortBy);

    if (type !== 'ALL') {
      params = params.set('type', type);
    }
    if (status !== 'ALL') {
      params = params.set('status', status);
    }

    return this.httpClient.get<ResponseObject>(`${this.BASE_URL}pathological`, { params }).pipe(
      tap(response => {
        this.pathologicalsSubject.next(response.data.data);
      })
    );
  }
}
