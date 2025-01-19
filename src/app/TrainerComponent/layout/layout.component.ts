import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,LayoutComponent,RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements AfterViewInit {
  isSidebarOpen: boolean = true; // Initial state: sidebar is open

  constructor(private router: Router) {}

  // This lifecycle hook ensures that on route change, the sidebar doesn't transition.
  ngAfterViewInit() {
    this.router.events.subscribe(() => {
      // Reset sidebar state when navigation ends
      if (this.isSidebarOpen) {
        // We make sure the sidebar stays open without triggering animation
        document.querySelector('.sidebar-nav-wrapper')?.classList.add('active');
      } else {
        document.querySelector('.sidebar-nav-wrapper')?.classList.remove('active');
      }
    });
  }

  // This function toggles the sidebar's open/close state
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
