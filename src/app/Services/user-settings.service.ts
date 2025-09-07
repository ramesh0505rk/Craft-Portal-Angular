import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private authService: AuthService) { }

  getUserDetails() {
    const token = this.getToken()
    const payloadBase64 = token?.split('.')[1]
    const payload = JSON.parse(atob(payloadBase64 ? payloadBase64 : ''))
    return {
      userID: payload.UserID,
      userName: payload.UserName,
      userEmail: payload.UserEmail,
      firstName: payload.FirstName,
      lastName: payload.LastName
    }
  }

  getToken() {
    return localStorage.getItem('access_token')
  }
}
