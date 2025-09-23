import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: Subscription | null = null
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false)

  constructor(private router: Router) {
    this.checkAuthStatus()
  }

  checkAuthStatus() {
    const token = localStorage.getItem('access_token')
    if (token) {
      const isValid = this.isTokenValid(token)
      this.isAuthenticatedSubject.next(isValid)

      if (isValid) {
        this.setAutoLogout(token)
      }
      else {
        this.logout()
      }
    }
    else {
      this.isAuthenticatedSubject.next(false)
    }
  }

  isTokenValid(token: string): boolean {
    try {
      const payloadBase64 = token.split('.')[1]
      const payload = JSON.parse(atob(payloadBase64))

      const expirationTime = payload.exp * 1000
      return expirationTime > Date.now()
    }
    catch (err) {
      console.error("Error parsing the access token")
      return false
    }
  }

  setAutoLogout(token: string) {
    if (this.tokenExpirationTimer)
      this.tokenExpirationTimer.unsubscribe()

    try {
      const payloadBase64 = token.split('.')[1]
      const payload = JSON.parse(atob(payloadBase64))
      const expirationTime = payload.exp * 1000

      const timeUntilExpire = expirationTime - Date.now()

      if (timeUntilExpire <= 0) {
        this.logout()
        return
      }

      this.tokenExpirationTimer = timer(timeUntilExpire).subscribe(() => {
        console.log('Token expired', 'logging out')
        this.logout()
      })
    }
    catch (err) {
      console.error('Error setting auto logout', err)
    }
  }

  logout() {
    document.body.classList.remove('dark-theme')
    localStorage.removeItem('access_token')

    this.isAuthenticatedSubject.next(false)

    if (this.tokenExpirationTimer) {
      this.tokenExpirationTimer.unsubscribe()
      this.tokenExpirationTimer = null
    }
    this.router.navigate(['signin'])
  }
}
