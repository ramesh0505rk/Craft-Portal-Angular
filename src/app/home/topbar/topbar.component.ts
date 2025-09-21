import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectModalComponent } from '../../create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, CreateProjectModalComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  isCollapsed = false;
  isDarkThemeEnabled: boolean = false;
  createProjectModalActive: boolean = false;

  constructor(private sidebarService: SidebarService, private router: Router, private homeComponent: HomeComponent, private modalService: NgbModal) { }

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

  openCreateProjectModal() {
    this.createProjectModalActive = true;
  }
}
