import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarService } from '../Services/sidebar.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../Services/user.service';
import { UserSettingsService } from '../Services/user-settings.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isSidebarCollapsed = false;
  userID: any

  constructor(private readonly router: Router, private sidebarService: SidebarService, private userService: UserService, private userSettingsService: UserSettingsService) { }

  ngOnInit(): void {
    this.sidebarService.isCollapsed$.subscribe(state => {
      this.isSidebarCollapsed = state;
    })

    this.setTheme()
  }

  setTheme() {
    var user = this.userSettingsService.getUserDetails()
    this.userID = user.userID
    console.log("User Details:", user)
    console.log("UserID:", this.userID)
    this.userService.getUserPreferencesByUserID(this.userID).subscribe({
      next: (res: any) => {
        if (res.darkTheme) {
          document.body.classList.add('dark-theme')
          console.log("Dark Theme Enabled")
        }
        else {
          document.body.classList.remove('dark-theme')
        }
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }
}
