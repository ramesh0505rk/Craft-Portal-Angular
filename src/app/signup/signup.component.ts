import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  passwordVisible: boolean = false

  constructor(private router: Router) { }

  onSignin() {
    this.router.navigate(['signin'])
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }
}
