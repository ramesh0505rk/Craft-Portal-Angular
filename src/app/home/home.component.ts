import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarService } from '../Services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isSidebarCollapsed = false;

  constructor(private readonly router: Router, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.isCollapsed$.subscribe(state => {
      this.isSidebarCollapsed = state;
    })
  }

}
