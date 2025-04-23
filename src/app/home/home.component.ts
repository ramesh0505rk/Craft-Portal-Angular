import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private readonly router: Router) { }

  onSignOut() {
    localStorage.removeItem('access_token')
    this.router.navigate(['signin'])
  }
}
