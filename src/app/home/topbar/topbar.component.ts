import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  isCollapsed = false;

  constructor(private sidebarService: SidebarService) { }

  onCollapseSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarService.setCollapsed(this.isCollapsed);
  }
}
