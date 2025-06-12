import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private readonly router: Router) { }
  onSignOut() {
    localStorage.removeItem('access_token')
    this.router.navigate(['signin'])
  }
}
