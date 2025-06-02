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
    return this.http.post(`${this.restApiUrl}/resetpassword/requestotp`, { Email: email })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err);
        }));
  }
  validateOtp(email: string, otp: string) {
  }

}
