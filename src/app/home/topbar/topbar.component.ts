import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  isCollapsed = false;
  isDarkThemeEnabled: boolean = false;

  constructor(private sidebarService: SidebarService, private router: Router, private homeComponent: HomeComponent) { }

  ngOnInit(): void {
    this.checkDarkThemeExists()
  }

  onCollapseSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarService.setCollapsed(this.isCollapsed);
  }

  onLogoClick() {
    this.router.navigate([''])
  }

  checkDarkThemeExists() {
    this.homeComponent.darkThemeEnabled.subscribe(value => {
      this.isDarkThemeEnabled = value
    });
  }
}
