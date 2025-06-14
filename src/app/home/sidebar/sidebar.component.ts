import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../Services/sidebar.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  private subscription!: Subscription
  constructor(private readonly router: Router, private sidebarService: SidebarService) { }

  ngOnInit() {
    this.subscription = this.sidebarService.isCollapsed$.subscribe(state => {
      this.isCollapsed = state;
      // console.log('Sidebar collapsed state:', this.isCollapsed);
    });
  }

  onSignOut() {
    localStorage.removeItem('access_token')
    this.router.navigate(['signin'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
