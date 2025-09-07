import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { MapType } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  restApiUrl = environment.restApiUrl;

  constructor(private readonly http: HttpClient) { }

  getTokenWithSignIn(UserName: string, Password: string): Observable<any> {

    var request = { UserName, Password }

    return this.http.post(`${this.restApiUrl}/user/signin`, request)
      .pipe(
        catchError((err) => {
          return throwError(() => err)
        })
      )
  }

  getTokenWithSignUp(UserName: string, FirstName: string, LastName: string, UserEmail: string, Password: string) {
    var request = { UserName, FirstName, LastName, UserEmail, Password }

    return this.http.post(`${this.restApiUrl}/user/signup`, request)
      .pipe(
        catchError(err => {
          return throwError(() => err)
        })
      )
  }

  getUserPreferencesByUserID(UserID: string) {
    return this.http.get(`${this.restApiUrl}/User/GetUserPreferences`, { params: { UserID } })
      .pipe(
        catchError(err => {
          return throwError(() => err)
        })
      )
  }
}