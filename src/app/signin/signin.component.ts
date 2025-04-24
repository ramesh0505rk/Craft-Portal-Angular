import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  signinForm: FormGroup
  passwordVisible: boolean = false
  isLoading: boolean = false

  constructor(private router: Router, private userService: UserService) {
    this.signinForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSignin() {
    this.isLoading = true
    if (this.signinForm.invalid) {
      this.isLoading = false
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.signinForm.controls).forEach(key => {
        const control = this.signinForm.get(key);
        control?.markAsTouched();
      });
      return; // Stop execution if form is invalid
    }

    const { userName, password } = this.signinForm.value

    this.userService.getTokenWithSignIn(userName, password).
      subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.token)
          this.router.navigate(['home'])
          this.isLoading = false
        },
        error: (err: any) => {
          console.error(err.error.message)
          this.isLoading = false
        }
      })
  }

  onSignup() {
    this.router.navigate(['signup'])
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }
}
