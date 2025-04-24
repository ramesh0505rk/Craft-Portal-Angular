import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup
  passwordVisible: boolean = false
  isLoading: boolean = false

  constructor(private router: Router, private readonly userService: UserService) {
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSignup() {
    this.isLoading = true
    if (this.signupForm.invalid) {
      this.isLoading = false
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        control?.markAsTouched();
      });
      return; // Stop execution if form is invalid
    }

    const { userName, firstName, lastName, email, password } = this.signupForm.value

    this.userService.getTokenWithSignUp(userName, firstName, lastName, email, password)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.token)
          this.router.navigate(['home'])
          this.isLoading = false
        },
        error: (err) => {
          console.error(err.error.message)
          this.isLoading = false
        }
      }
      )
  }

  onSignin() {
    this.router.navigate(['signin'])
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }
}
