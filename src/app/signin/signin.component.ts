import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  passwordVisible: boolean = false

  constructor(private router: Router) { }

  onSignup() {
    this.router.navigate(['signup'])
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }
}
