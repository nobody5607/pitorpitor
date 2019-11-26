import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Storage } from '@ionic/storage';  
import { environment } from './environment.prod';  

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = `${environment.BASE_URL}/api`;
  private token = null;
  constructor(
    private http: HttpClient,
    private storage: Storage  
  ) { 
    this.getToken();
  }

  login(username, password): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({}) };
    const form = new FormData();
    form.append('username', username);
    form.append('password', password); 
    return this.http.post(`${this.baseUrl}/login`, form, httpOptions).pipe(
      map(results => {
        console.log(results);

        if (results['success'] === true) {
          console.warn('status login ', results['success']);  
          this.storage.set('USER_INFO', JSON.stringify(results['data']));
          this.storage.set('token', results['data']['token']);
        } 
        return results;
      }),
      catchError(err => {
        // console.warn('error', err);
        throw new Error("เกิดข้อผิดพลาดบน Server");
      })
    );
  }
  async getToken(){
   this.token = await this.storage.get('token');
   console.warn('constructor token = ', this.token); 
  } 

  getLessons(search: string, token:string): Observable<any> { 
    console.log('token = ', this.token);
    return this.http.get(`${this.baseUrl}/lesson?term=${search}&token=${token}`).pipe(
      map(results => results),
      catchError(this.handleError)
    );
  }
  getLessonByid(id, token): Observable<any> { 
    console.log('token = ', this.token);
    return this.http.get(`${this.baseUrl}/lesson-by-id?id=${id}&token=${token}`).pipe(
      map(results => results),
      catchError(this.handleError)
    );
  }
  // getGameAll(){
  //   console.log('token = ', this.token);
  //   return this.http.get(`${this.baseUrl}/game/game-alls&token=${this.token}`).pipe(
  //     map(results => results),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
