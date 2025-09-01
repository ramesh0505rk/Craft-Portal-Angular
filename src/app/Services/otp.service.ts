import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  restApiUrl = environment.restApiUrl;
  constructor(private http: HttpClient) { }

  requestOtp(email: string) {
    return this.http.post(`${this.restApiUrl}/otp/requestotp`, { UserEmail: email })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err);
        }));
  }
  
  validateOtp(email: string, otp: string) {
    return this.http.post(`${this.restApiUrl}/otp/validateOtp`, { UserEmail: email, Otp: otp })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err);
        }));
  }

  resetPassword(email: string, newPassword: string, otp: string) {
    return this.http.post(`${this.restApiUrl}/password/resetpassword`, { UserEmail: email, NewPassword: newPassword, Otp: otp })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err);
        }));
  }
}
